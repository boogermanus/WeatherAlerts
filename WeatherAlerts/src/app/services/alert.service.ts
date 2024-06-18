import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IAlertsResponse } from '../interfaces/ialerts-response';
import { HttpParams } from '@angular/common/http';
import { IAlert } from '../interfaces/ialert';
import { IAlertProperties } from '../interfaces/ialert-properties';
import { IAlertResponse } from '../interfaces/ialert-response';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly STATUS: string = 'status';
  private readonly STATUS_ACTUAL: string = 'actual';
  private readonly CHOP_LENGTH: number = 3;

  constructor(private apiService: ApiService) { }

  public getActiveAlerts(): Observable<IAlertsResponse> {
    const params = new HttpParams()
      .append(this.STATUS, this.STATUS_ACTUAL);

    return this.apiService.activeAlerts(params);
  }

  public getAlertById(id: string): Observable<IAlertResponse> {
    return this.apiService.alert(id);
  }

  public getAlertsByZoneId(zoneId: string): Observable<IAlertsResponse> {
    return this.apiService.activeAlertsByZone(zoneId);
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

  private splitAreaDesc(areaDesc: string): string[] {
    return areaDesc.split(';').map(s => s.trim());
  }

  public mapAlertResponseToAlertProperties(response: IAlertResponse): IAlertProperties {
    const properties = response.properties;
    properties.senderName = this.chopNwsFromSenderName(properties.senderName);
    properties.areas = this.splitAreaDesc(properties.areaDesc);
    return properties;
  }
}
