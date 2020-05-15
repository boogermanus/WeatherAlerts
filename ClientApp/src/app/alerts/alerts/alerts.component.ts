import { Component, OnInit, ViewChild } from '@angular/core';
import { IAlertsResponse } from '../../weather-api/interfaces/ialerts-response';
import { IAlertProperties } from '../../weather-api/interfaces/ialert-properties';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsService } from '../../weather-api/services/alerts.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  private readonly EVENT = 'event';
  private readonly ISSUER = 'issuer';
  private readonly SEVERITY = 'severity';
  private readonly TYPE = 'type';

  public displayedColumns = ['event', 'senderName', 'sent', 'messageType', 'severity'];
  // don't do this: filterOn: ['All', 'Event', 'Issuer', 'Sent', 'Severity', 'Type'];
  // it is a valid statement, but the select will not load!
  public filterOn = ['All', 'Event', 'Issuer', 'Type', 'Severity'];
  public filterOnType = 'all';
  public alerts: IAlertProperties[] = [];
  public loading = true;
  public dataSource: MatTableDataSource<IAlertProperties>;
  public errorLoading = false;
  private originalFilterPredicate: (data: IAlertProperties, filter: string) => boolean;

  @ViewChild(MatPaginator, {static: true})paginator: MatPaginator;
  @ViewChild(MatSort, {static: true})sort: MatSort;

  constructor(private alertsService: AlertsService) { }

  public ngOnInit(): void {
    this.alertsService.getActiveAlerts()
      .then((data: IAlertsResponse) => this.setupDataSource(data))
      .catch((reason) => {
        this.loading = false;
        this.errorLoading = true;
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
      case this.ISSUER:
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
