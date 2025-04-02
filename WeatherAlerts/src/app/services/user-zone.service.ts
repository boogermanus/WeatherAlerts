import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserZone } from '../interfaces/iuser-zone';
import { ApiConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserZoneService {

  constructor(private readonly httpClient: HttpClient) { }

  public getUserZones(): Observable<IUserZone[]> {
    return this.httpClient.get<IUserZone[]>(`${ApiConfig.zoneApi}/GetUserZones`);
  }

  public addUserZone(userZone: IUserZone): Observable<IUserZone> {
    return this.httpClient.post<IUserZone>(`${ApiConfig.zoneApi}/AddUserZone`, userZone)
  }

  public deleteUserZone(zoneId: string): Observable<IUserZone> {
    return this.httpClient.delete<IUserZone>(`${ApiConfig.zoneApi}/DeleteUserZone/${zoneId}`);
  }
}
