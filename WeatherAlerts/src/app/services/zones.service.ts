import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IZonesResponse } from '../interfaces/izones-response';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  private readonly AREA = 'area';
  private readonly TYPE = 'type';
  private readonly COUNTY = 'county';
  private readonly ID = 'id';
  constructor(private readonly apiService: ApiService) { }

  public getZonesByArea(area: string): Observable<IZonesResponse> {
    const params = new HttpParams()
      .append(this.AREA,area)
      .append(this.TYPE, this.COUNTY);

    return this.apiService.zones(params);
  }

  public getZoneById(zoneIds: string[]): Observable<IZonesResponse> {
    const idParam = zoneIds.join(',');
    const params = new HttpParams()
      .append(this.ID, idParam);

    return this.apiService.zones(params);
  }
}
