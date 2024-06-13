import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { IAlertProperties } from '../../interfaces/ialert-properties';
import { AlertService } from '../../services/alert.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { OnInit } from '@angular/core';
import { IAlertsResponse } from '../../interfaces/ialerts-response';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatPaginatorModule,
    CommonModule, 
    MatSortModule,
    MatInputModule
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent implements OnInit {



  private readonly EVENT = 'event';
  private readonly issuer = 'issuer';
  private readonly SEVERITY = 'severity';
  private readonly TYPE = 'type';

  public displayedColumns = ['event', 'senderName', 'sent', 'messageType', 'severity'];
  // don't do this: filterOn: ['All', 'Event', 'issuer', 'Sent', 'Severity', 'Type'];
  // it is a valid statement, but the select will not load!
  public filterOn = ['All', 'Event', 'Issuer', 'Type', 'Severity'];
  public filterOnType = 'all';
  public alerts: IAlertProperties[] = [];
  public loading = true;
  public dataSource: MatTableDataSource<IAlertProperties>;
  public errorLoading = false;
  private originalFilterPredicate: ((data: IAlertProperties, filter: string) => boolean) | undefined;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private alertsService: AlertService) {
    this.dataSource = new MatTableDataSource<IAlertProperties>(this.alerts);
  }

  public ngOnInit(): void {
    // this.alertsService.getActiveAlerts()
    //   .then((data: IAlertsResponse) => this.setupDataSource(data))
    //   .catch((reason) => {
    //     console.log(reason);
    //     this.loading = false;
    //     this.errorLoading = true;
    //   });

    this.alertsService.getActiveAlerts()
      .subscribe(
        {
          next: (data) => this.setupDataSource(data),
          error: (error) => console.log(error)
        });
  }

  private setupDataSource(data: IAlertsResponse): void {
    this.loading = false;
    this.alerts = data.features.map(f => this.alertsService.mapAlertsToAlertProperties(f));
    this.dataSource = new MatTableDataSource<IAlertProperties>(this.alerts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.originalFilterPredicate = this.dataSource.filterPredicate;
  }

  public filterOnChanged(event: MatSelectChange): void {
    // force the value to string type so we can switch;
    const value: string = event.value;

    switch (value.toLowerCase()) {
      case this.EVENT:
        this.dataSource.filterPredicate = this.filterByEvent;
        break;
      case this.issuer:
        this.dataSource.filterPredicate = this.filterByIssure;
        break;
      case this.TYPE:
        this.dataSource.filterPredicate = this.filterByType;
        break;
      case this.SEVERITY:
        this.dataSource.filterPredicate = this.filterBySeverity;
        break;
      default:
        this.dataSource.filterPredicate = this.originalFilterPredicate;
    }
  }

  public filterOnKeyUp(event: any): void {
    this.dataSource.filter = event.target.value;
  }

  private filterByEvent(data: IAlertProperties, filter: string): boolean {
    return !filter || data.event.toLowerCase().includes(filter.toLowerCase());
  }

  private filterByIssure(data: IAlertProperties, filter: string): boolean {
    return !filter || data.senderName.toLowerCase().includes(filter.toLowerCase());
  }

  private filterByType(data: IAlertProperties, filter: string): boolean {
    return !filter || data.messageType.toLowerCase().includes(filter.toLowerCase());
  }

  private filterBySeverity(data: IAlertProperties, filter: string): boolean {
    return !filter || data.severity.toLowerCase().includes(filter.toLowerCase());
  }
}
