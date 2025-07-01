import {Component, OnDestroy, OnInit} from '@angular/core';
import {ZoneSearchComponent} from '../zone-search/zone-search.component';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import {ZoneMapComponent} from "../zone-map/zone-map.component";

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css',
  imports: [
    ZoneSearchComponent,
    MatButtonToggleModule,
    ZoneMapComponent
  ]
})
export class ZonesComponent {

  public mode: string = 'map';

  constructor() {
  }

  public onChange(event: MatButtonToggleChange): void {
    this.mode = event.value;
  }

}
