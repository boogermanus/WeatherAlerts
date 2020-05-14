import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAlertProperties } from 'src/app/weather-api/interfaces/ialert-properties';
import { AlertsService } from 'src/app/weather-api/services/alerts.service';
import { AlertProperties } from 'src/app/weather-api/models/alert-properties';

@Component({
  selector: 'app-alerts-view',
  templateUrl: './alerts-view.component.html',
  styleUrls: ['./alerts-view.component.css']
})
export class AlertsViewComponent implements OnInit {
  readonly ID = 'id';
  // replace this def with the other and get an error.
  // alert: IAlertProperties
  alert: IAlertProperties = new AlertProperties();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertsService: AlertsService) { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params[this.ID];
    const alert = await this.alertsService.getAlertById(id);
    this.alert = this.alertsService.mapAlertResponseToAlertProperties(alert);
  }

}
