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
  providers: []
})
export class AlertsModule { }
