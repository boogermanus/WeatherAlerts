import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IZoneProperties } from '../../interfaces/izone-properties';
import { UserZoneService } from '../../services/user-zone.service';
import { ZonesService } from '../../services/zones.service';
import { ViewZoneAlertComponent } from '../view-zone-alert/view-zone-alert.component';
import { Subscription } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
    selector: 'app-my-zones',
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        ViewZoneAlertComponent,
        MatBadgeModule
    ],
    templateUrl: './my-zones.component.html',
    styleUrl: './my-zones.component.css'
})
export class MyZonesComponent implements OnInit, OnDestroy {
  public zones: IZoneProperties[] = [];
  private subscriptions: Subscription = new Subscription();
  public showNoZones = false;

  constructor(private readonly userZoneService: UserZoneService,
    private readonly zonesService: ZonesService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.userZoneService.getUserZones()
      .subscribe({
        next: (data) => {
          let userZones = data.map(uz => uz.zoneId);
          if(userZones.length === 0) {
            this.showNoZones = true;
            return;
          }
          this.loadZones(userZones);
        }
      }));
  }

  public loadZones(zones: string[]): void {
    this.subscriptions.add(this.zonesService.getZoneById(zones)
    .subscribe({
      next: (data) => {
        this.zones = data.features.map(f => {
          f.properties.userHasZone = true;
          return f.properties;
        });
      }
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public remove(zoneId: string): void {
    this.subscriptions.add(this.userZoneService.deleteUserZone(zoneId)
      .subscribe({
        next: () => {
          const index = this.zones.findIndex(z => z.id === zoneId)
          this.zones.splice(index, 1);
          if(this.zones.length === 0) {
            this.showNoZones = true;
          }
        }
      }));
  }

}
