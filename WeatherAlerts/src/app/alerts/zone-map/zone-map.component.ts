import { Component } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LatLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-zone-map',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './zone-map.component.html',
  styleUrl: './zone-map.component.css'
})
export class ZoneMapComponent {
  public latLng: LatLng = new LatLng(33.67,-101.82);
  public options: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
    ],
    zoom: 5,
    center: this.latLng
  }
}
