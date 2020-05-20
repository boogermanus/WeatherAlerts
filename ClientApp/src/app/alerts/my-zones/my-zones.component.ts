import { Component, OnInit } from '@angular/core';
import { ApplicationUserZoneService } from 'src/app/services/application-user-zone.service';
import { IApplicationUserZone } from 'src/app/interfaces/iapplication-user-zone';
import { Observable } from 'rxjs';
import { IAlertProperties } from 'src/app/weather-api/interfaces/ialert-properties';
import { IAlertsResponse } from 'src/app/weather-api/interfaces/ialerts-response';
import { AlertsService } from 'src/app/weather-api/services/alerts.service';

@Component({
  selector: 'app-my-zones',
  templateUrl: './my-zones.component.html',
  styleUrls: ['./my-zones.component.css']
})
export class MyZonesComponent implements OnInit {

  zones: IApplicationUserZone[];
  alerts: IAlertProperties[] = [];
  constructor(private applicationUserZoneService: ApplicationUserZoneService,
              private alertsService: AlertsService) { }

  async ngOnInit() {
    this.zones = await this.applicationUserZoneService.getUserZones();

    for (const zone of this.zones) {
      const data: IAlertsResponse = await this.alertsService.getAlertByZoneId(zone.zoneId);
      const alerts: IAlertProperties[] = data.features.map(f => this.alertsService.mapAlertsToAlertProperties(f));
      this.alerts.push(...alerts);
    }
  }

}
