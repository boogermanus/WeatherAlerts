import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { icon, LatLng, Layer, LeafletMouseEvent, marker, tileLayer } from 'leaflet';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { PointService } from '../../services/point.service';
import { CommonModule } from '@angular/common';
import { UserZoneService } from '../../services/user-zone.service';
import { IUserZone } from '../../interfaces/iuser-zone';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-zone-map',
    imports: [
        LeafletModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './zone-map.component.html',
    styleUrl: './zone-map.component.css'
})
export class ZoneMapComponent implements OnInit, OnDestroy {
  public latLng: LatLng = new LatLng(33.67, -101.82);
  public markers: Layer[] = [];
  public options: any = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
    ],
    zoom: 5,
    center: this.latLng
  }
  public data: any = null;
  public userZones: IUserZone[] = [];
  public subscriptions: Subscription = new Subscription();
  public loading: boolean = false;

  public city: string = '';
  public state: string = '';
  public list: string[] = [];

  constructor(
    private readonly pointService: PointService,
    private readonly userZoneService: UserZoneService
  ) { }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.userZoneService.getUserZones()
        .subscribe({
          next: (data) => this.userZones = data
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


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
    this.loading = true;
    this.subscriptions.add(
      this.pointService.getPoints(this.latLng)
        .subscribe({
          next: (data) => this.handleData(data)
        })
    );
  }

  private handleData(data: any): void {
    this.loading = false;
    this.data = data;
    this.city = data.properties.relativeLocation.properties.city;
    this.state = data.properties.relativeLocation.properties.state;

    if (data.properties.forecastZone !== '') {
      this.addZone(data.properties.forecastZone);
    }

    if (data.properties.county !== '') {
      this.addZone(data.properties.county);
    }
  }

  private addZone(zone: string): void {
    const index = zone.lastIndexOf('/');
    const zoneId = zone.substring(index + 1, zone.length);
    const found = this.userZones.findIndex(f => f.zoneId === zoneId) !== -1;

    if (!found) {
      this.list.push(zoneId);
    }
  }

  public handleAdd(value: string): void {
    this.userZoneService.addUserZone({ zoneId: value, createDate: new Date(), visible: true })
      .subscribe({
        next: () => {
          const index = this.list.findIndex(f => f === value);
          this.list.splice(index);
        }
      })

  }
}
