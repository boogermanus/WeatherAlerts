import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IApplicationUserZone } from '../interfaces/iapplication-user-zone';

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserZoneService {

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  async getUserZones(userId?: string): Promise<IApplicationUserZone[]> {
    let params = new HttpParams();

    if (userId) {
      params = params.set('userId', userId);
    }

    return await this.httpClient.get<IApplicationUserZone[]>(`${this.baseUrl}applicationuserzone`, {params}).toPromise();
  }

  async addUserZone(userZone: IApplicationUserZone): Promise<IApplicationUserZone> {
    return await this.httpClient.post<IApplicationUserZone>(`${this.baseUrl}applicationuserzone`, userZone).toPromise();
  }

 async deleteUserZone(zoneId: string) {
   return await this.httpClient.delete<IApplicationUserZone>(`${this.baseUrl}applicationuserzone/${zoneId}`).toPromise();
 }
}
