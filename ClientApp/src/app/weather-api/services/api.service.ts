import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IAlertsResponse } from '../interfaces/ialerts-response';
import { IAlertResponse } from '../interfaces/ialert-response';
import { IZonesResponse } from '../interfaces/izones-response';

@Injectable()
export class ApiService {

  private readonly ALERTS_URL = 'https://api.weather.gov/alerts';
  private readonly ACTIVE_ALERTS_URL = 'https://api.weather.gov/alerts/active';
  private readonly BAD_URL = 'http://asdflkasduriasdoifasudofioasudfoausdfouaoduf.com';
  private readonly ZONES_URL = 'https://api.weather.gov/zones';

  constructor(private httpClient: HttpClient) { }

  public activeAlerts(params?: HttpParams): Promise<IAlertsResponse> {
    // uncomment to have a bad time
    // return this.httpClient.get<IAlertsResponse>(this.BAD_URL).toPromise();
    return this.httpClient.get<IAlertsResponse>(this.ACTIVE_ALERTS_URL, {params}).toPromise();
  }

  public activeAlertsByZone(zoneId: string) {
    return this.httpClient.get<IAlertsResponse>(`${this.ACTIVE_ALERTS_URL}/zone/${zoneId}`).toPromise();
  }

  public alert(path: string): Promise<IAlertResponse> {
    return this.httpClient.get<IAlertResponse>(`${this.ALERTS_URL}/${path}`).toPromise();
  }

  public zones(params?: HttpParams): Promise<IZonesResponse> {
    return this.httpClient.get<IZonesResponse>(`${this.ZONES_URL}`, {params}).toPromise();
  }

}
