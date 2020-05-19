import { Component, OnInit } from '@angular/core';
import { ApplicationUserZoneService } from 'src/app/services/application-user-zone.service';
import { IApplicationUserZone } from 'src/app/interfaces/iapplication-user-zone';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-zones',
  templateUrl: './my-zones.component.html',
  styleUrls: ['./my-zones.component.css']
})
export class MyZonesComponent implements OnInit {

  zones: IApplicationUserZone[];
  constructor(private applicationUserZoneService: ApplicationUserZoneService) { }

  async ngOnInit() {
    this.zones = await this.applicationUserZoneService.getUserZones();
  }

}
