import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IUserZone } from '../interfaces/iuser-zone';
import { ApiConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserZoneService {

  private readonly USER_ID: string = "userId";
  constructor(private readonly httpClient: HttpClient) { }

  public getUserZones(userId?: string): Promise<IUserZone[]> {
    let params = new HttpParams();

    if (userId) {
      params.set(this.USER_ID, userId)
    }

    const data = this.httpClient.get<IUserZone[]>(`${ApiConfig.zoneApi}/GetUserZones`, { params });
    return lastValueFrom(data);
  }

  public addUserZone(userZone: IUserZone): Promise<IUserZone> {
    const data = this.httpClient.post<IUserZone>(`${ApiConfig.zoneApi}/AddUserZone`, userZone);
    return lastValueFrom(data);
  }

  public deleteUserZone(zoneId: string): Promise<IUserZone> {
    const data = this.httpClient.delete<IUserZone>(`${ApiConfig.zoneApi}/DeleteUserZone/${zoneId}`);
    return lastValueFrom(data);
  }
}
