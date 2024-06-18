import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IUserZone } from '../../interfaces/iuser-zone';
import { IZoneProperties } from '../../interfaces/izone-properties';
import { UserZoneService } from '../../services/user-zone.service';
import { ZonesService } from '../../services/zones.service';

@Component({
  selector: 'app-my-zones',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './my-zones.component.html',
  styleUrl: './my-zones.component.css'
})
export class MyZonesComponent implements OnInit {

  public userZones: IUserZone[] = [];
  public zones: IZoneProperties[] = [];

  constructor(private readonly userZoneService: UserZoneService,
    private readonly zonesService: ZonesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userZones = await this.userZoneService.getUserZones();
    const userZoneIds = this.userZones.map(uz => uz.zoneId);
    this.zonesService.getZoneById(userZoneIds)
      .subscribe({
        next: (data) => {
          this.zones = data.features.map(f => {
            f.properties.userHasZone = true;
            return f.properties;
          })
        }
      });
  }

  async remove(zoneId: string): Promise<void> {
    await this.userZoneService.deleteUserZone(zoneId);
    const index = this.zones.findIndex(z => z.id == zoneId);
    this.zones.splice(index,1);
  }

}
