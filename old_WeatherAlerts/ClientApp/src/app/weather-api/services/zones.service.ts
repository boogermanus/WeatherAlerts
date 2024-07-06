import { Injectable } from '@angular/core';
import { WeatherApiModule } from '../weather-api.module';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { IZoneProperties } from '../interfaces/izone-properties';
import { IZonesResponse } from '../interfaces/izones-response';
import { IZone } from '../interfaces/izone';

@Injectable({
  providedIn: WeatherApiModule
})
export class ZonesService {

  private readonly AREA = 'area';
  private readonly TYPE = 'type';
  private readonly COUNTY = 'county';
  private readonly ID = 'id';
  constructor(private apiService: ApiService) { }

  public getZonesByArea(area: string): Promise<IZonesResponse> {
    const params = new HttpParams()
      .append(this.AREA, area)
      .append(this.TYPE, this.COUNTY);

    return this.apiService.zones(params);
  }

  public getZoneById(zoneIds: string[]): Promise<IZonesResponse> {

    const idParam = zoneIds.join(',');

    return this.apiService.zones(new HttpParams().append(this.ID, idParam));
  }

}
