import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  private readonly url: string = 'https://api.weather.gov/points';
  constructor(private readonly httpClient: HttpClient) { }

  public getPoints(location: LatLng): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${location.lat},${location.lng}`)
  }
}
