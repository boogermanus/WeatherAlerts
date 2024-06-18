import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserZone } from '../interfaces/iuser-zone';
import { ApiConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserZoneService {

  private readonly USER_ID: string = "userId";
  constructor(private readonly httpClient: HttpClient) { }

  public getUserZones(userId?: string): Observable<IUserZone> {
    let params = new HttpParams();

    if (userId) {
      params.set(this.USER_ID, userId)
    }

    return this.httpClient.get<IUserZone>(`${ApiConfig.zoneApi}/GetUserZone`, { params });
  }

  public addUserZone(userZone: IUserZone): Observable<IUserZone> {
    return this.httpClient.post<IUserZone>(`${ApiConfig.zoneApi}/AddUserZone`, userZone);
  }
}
