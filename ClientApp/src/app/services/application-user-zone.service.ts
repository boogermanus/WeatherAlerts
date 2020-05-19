import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IApplicationZoneUser } from '../interfaces/iapplication-zone-user';

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserZoneService {

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  async getUserZones(userId?: string): Promise<IApplicationZoneUser> {
    let params = new HttpParams();

    if (!userId) {
      params = params.set('userId', userId);
    }

    return await this.httpClient.get<IApplicationZoneUser>(`${this.baseUrl}applicationzoneuser`, {params}).toPromise();
  }
}
