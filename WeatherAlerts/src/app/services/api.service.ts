import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlertsResponse } from '../interfaces/ialerts-response';
import { IAlertResponse } from '../interfaces/ialert-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly ALERTS_URL = 'https://api.weather.gov/alerts';
  private readonly ACTIVE_ALERTS_URL = 'https://api.weather.gov/alerts/active';
  constructor(private httpClient: HttpClient) { }

  public activeAlerts(params? :HttpParams): Observable<IAlertsResponse> {
    return this.httpClient.get<IAlertsResponse>(`${this.ACTIVE_ALERTS_URL}`, {params});
  }

  public alert(path: string): Observable<IAlertResponse> {
    return this.httpClient.get<IAlertResponse>(`${this.ALERTS_URL}/${path}`);
  }
}
