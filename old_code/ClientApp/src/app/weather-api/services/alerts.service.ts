import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IAlertsResponse } from '../interfaces/ialerts-response';
import { HttpParams } from '@angular/common/http';
import { IAlert } from '../interfaces/ialert';
import { IAlertProperties } from '../interfaces/ialert-properties';
import { IAlertResponse } from '../interfaces/ialert-response';
import { WeatherApiModule } from '../weather-api.module';

@Injectable({
  providedIn: WeatherApiModule
})
export class AlertsService {
  private readonly STATUS = 'status';
  private readonly STATUS_ACTUAL = 'actual';
  private readonly CHOP_LENGTH = 3;

  constructor(private apiService: ApiService) { }

  public getActiveAlerts(): Promise<IAlertsResponse> {

    // exclude excercise, system, test, draft
    const params = new HttpParams()
      .append(this.STATUS, this.STATUS_ACTUAL);

    return this.apiService.activeAlerts(params);
  }

  public getAlertById(id: string): Promise<IAlertResponse> {
    return this.apiService.alert(id);
  }

  public getAlertByZoneId(zone: string): Promise<IAlertsResponse> {
    return this.apiService.activeAlertsByZone(zone);
  }

  public mapAlertsToAlertProperties(alert: IAlert): IAlertProperties {
    const properties = alert.properties;
    properties.senderName = this.chopNwsFromSenderName(properties.senderName);
    properties.areas = this.splitAreaDesc(properties.areaDesc);
    return properties;
  }

  private chopNwsFromSenderName(senderName: string): string {
    return senderName.substring(this.CHOP_LENGTH, senderName.length);
  }

  public mapAlertResponseToAlertProperties(response: IAlertResponse): IAlertProperties {
    const properties = response.properties;
    properties.senderName = this.chopNwsFromSenderName(properties.senderName);
    properties.areas = this.splitAreaDesc(properties.areaDesc);
    return properties;
  }

  private splitAreaDesc(areaDesc: string): string[] {
    return areaDesc.split(';').map(s => s.trim());
  }
}
