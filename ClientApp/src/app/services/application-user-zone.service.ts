import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserZoneService {

  constructor(private httpClient: HttpClient) { }
}
