import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { IAlertProperties } from '../../interfaces/ialert-properties';
import { AlertService } from '../../services/alert.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { OnInit } from '@angular/core';
import { IAlertsResponse } from '../../interfaces/ialerts-response';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule],
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
}
