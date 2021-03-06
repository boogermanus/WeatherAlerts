import { Component, OnInit } from '@angular/core';
import { ApplicationUserZoneService } from 'src/app/services/application-user-zone.service';
import { IApplicationUserZone } from 'src/app/interfaces/iapplication-user-zone';
import { IZoneProperties } from 'src/app/weather-api/interfaces/izone-properties';
import { ZonesService } from 'src/app/weather-api/services/zones.service';

@Component({
  selector: 'app-my-zones',
  templateUrl: './my-zones.component.html',
  styleUrls: ['./my-zones.component.css']
})
export class MyZonesComponent implements OnInit {

  userZones: IApplicationUserZone[] = [];
  zones: IZoneProperties[] = [];

  constructor(private applicationUserZoneService: ApplicationUserZoneService,
              private zonesService: ZonesService) { }

  async ngOnInit() {
    this.userZones = await this.applicationUserZoneService.getUserZones();
    const userZoneIds = this.userZones.map(z => z.zoneId);
    const data = await this.zonesService.getZoneById(userZoneIds);
    this.zones = data.features.map(f => {
      f.properties.userHasZone = true;
      return f.properties;
    });
  }

  async remove(zoneId: string) {
    await this.applicationUserZoneService.deleteUserZone(zoneId);
    const index = this.zones.findIndex(z => z.id === zoneId);
    this.zones.splice(index, 1);
  }

}
