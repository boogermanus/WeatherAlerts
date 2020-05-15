import { NgModule } from '@angular/core';
import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsComponent } from './alerts/alerts.component';
import { WeatherApiModule } from '../weather-api/weather-api.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AlertsViewComponent } from './alerts-view/alerts-view.component';
import { ZonesComponent } from './zones/zones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZonePipe } from './pipes/zone.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';


@NgModule({
  declarations: [AlertsComponent, AlertsViewComponent, ZonesComponent, ZonePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertsRoutingModule,
    WeatherApiModule,
    MaterialModule
  ],
  exports: [AlertsComponent, AlertsViewComponent],
  // might be needed soon
  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }]
})
export class AlertsModule { }
