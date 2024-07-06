import { Component, OnInit, Input } from '@angular/core';
import { IAlertProperties } from 'src/app/weather-api/interfaces/ialert-properties';
import { AlertsService } from 'src/app/weather-api/services/alerts.service';
import { IAlertsResponse } from 'src/app/weather-api/interfaces/ialerts-response';

@Component({
  selector: 'app-view-zone-alerts',
  templateUrl: './view-zone-alerts.component.html',
  styleUrls: ['./view-zone-alerts.component.css']
})
export class ViewZoneAlertsComponent implements OnInit {

  @Input()zoneId: string;
  loading = true;
  alerts: IAlertProperties[];
  constructor(private alertsService: AlertsService) { }

  ngOnInit() {
    this.alertsService.getAlertByZoneId(this.zoneId)
      .then((data) => {
        this.alerts = data.features.map(f => this.alertsService.mapAlertsToAlertProperties(f));
        this.loading = false;
      });
  }

}
