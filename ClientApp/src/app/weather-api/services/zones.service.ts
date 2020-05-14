import { Injectable } from '@angular/core';
import { WeatherApiModule } from '../weather-api.module';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { IZoneProperties } from '../interfaces/izone-properties';
import { IZonesResponse } from '../interfaces/izones-response';

@Injectable({
  providedIn: WeatherApiModule
})
export class ZonesService {

  private readonly AREA = 'area';
  constructor(private apiService: ApiService) { }

  getZonesByArea(area: string): Promise<IZonesResponse> {
    const params = new HttpParams()
      .set(this.AREA, area);

    return this.apiService.zones(params);
  }
}
