import { Injectable } from '@angular/core';
import { WeatherApiModule } from '../weather-api.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IAlertsResponse } from '../interfaces/ialerts-response';
import { IAlertResponse } from '../interfaces/ialert-response';

@Injectable()
export class ApiService {

  private readonly ALERTS_URL = 'https://api.weather.gov/alerts';
  private readonly ACTIVE_ALERTS_URL = 'https://api.weather.gov/alerts/active';
  private readonly ZONES_URL = 'https://api.weather.gov/zones';

  constructor(private httpClient: HttpClient) { }

  public activeAlerts(params?: HttpParams): Promise<IAlertsResponse> {

    return this.httpClient.get<IAlertsResponse>(this.ACTIVE_ALERTS_URL, {params}).toPromise();
  }

  public alert(path: string): Promise<IAlertResponse> {
    return this.httpClient.get<IAlertResponse>(`${this.ALERTS_URL}/${path}`).toPromise();
  }

  public zones(params?: HttpParams): Promise<any> {
    return this.httpClient.get<any>(`${this.ZONES_URL}`, {params}).toPromise();
  }

}
