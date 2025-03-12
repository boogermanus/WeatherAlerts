import { Component } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { icon, LatLng, Layer, LeafletMouseEvent, marker, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { PointService } from '../../services/point.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zone-map',
  standalone: true,
  imports: [
    LeafletModule,
    CommonModule
  ],
  templateUrl: './zone-map.component.html',
  styleUrl: './zone-map.component.css'
})
export class ZoneMapComponent {
  public latLng: LatLng = new LatLng(33.67, -101.82);
  public markers: Layer[] = [];
  public options: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
    ],
    zoom: 5,
    center: this.latLng
  }
  public info: Observable<any>;

  constructor(private readonly pointService: PointService) {}

  public handleClick(event: LeafletMouseEvent): void {
    this.latLng = event?.latlng;
    this.markers.splice(0);
    const newMarker = marker([this.latLng.lat, this.latLng.lng],
      {
        // how to properly show an icon
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }
    )
    this.markers.push(newMarker);
    this.info = this.pointService.getPoints(this.latLng);
  }
}
