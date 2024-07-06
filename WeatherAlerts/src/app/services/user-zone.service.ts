import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IUserZone } from '../interfaces/iuser-zone';
import { ApiConfig } from '../config';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserZoneService {

  constructor(private readonly httpClient: HttpClient) { }

  public getUserZones(): Observable<IUserZone[]> {
    return this.httpClient.get<IUserZone[]>(`${ApiConfig.zoneApi}/GetUserZones`);
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
