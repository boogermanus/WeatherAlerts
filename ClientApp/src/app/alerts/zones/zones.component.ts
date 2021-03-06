import { Component, OnInit } from '@angular/core';
import { StateConstants } from 'src/app/weather-api/models/state-constants';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ZonesService } from 'src/app/weather-api/services/zones.service';
import { IZonesResponse } from 'src/app/weather-api/interfaces/izones-response';
import { IZoneProperties } from 'src/app/weather-api/interfaces/izone-properties';
import { ApplicationUserZoneService } from 'src/app/services/application-user-zone.service';
import { IApplicationUserZone } from 'src/app/interfaces/iapplication-user-zone';

function validateState(control: FormControl): ValidationErrors {
  const value = control.value;
  let valid = false;
  if (typeof value === 'object') {
    valid = true;
  }

  return valid ? null : {statesError: true};
}

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  statesControl = new FormControl('', validateState);
  states: any[] = StateConstants.states;
  statesFilter: Observable<any[]>;
  zones: IZoneProperties[];
  filter = '';
  loading = false;
  showTable = false;
  userZones: IApplicationUserZone[] = [];

  constructor(private zonesService: ZonesService,
              private applicationUserZoneService: ApplicationUserZoneService) { }

  async ngOnInit() {
    this.statesFilter = this.statesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.caption),
        map(caption => caption ? this.filterState(caption) : this.states.slice())
      );

    this.userZones = await this.applicationUserZoneService.getUserZones();
  }

  public displayWith(value: any): string {
    return value && value.typeValue ? value.caption : '';
  }

  public loadZones(): void {
    if (typeof this.statesControl.value !== 'object') {
      return;
    }
    this.loading = true;
    this.showTable = false;
    this.zonesService.getZonesByArea(this.statesControl.value.typeValue)
      .then((data: IZonesResponse) => {
        this.zones = data.features.map(f => f.properties);
        this.loading = false;
        this.showTable = true;
        this.filter = '';

        for (const zone of this.zones) {
          if (this.userZones.findIndex(uz => uz.zoneId === zone.id) !== -1) {
            zone.userHasZone = true;
          } else {
            zone.userHasZone = false;
          }
        }
      });
  }

  private filterState(caption: string): any[] {
    return this.states
      .filter(option => option.caption
        .toLowerCase()
        .startsWith(caption.toLowerCase()));
  }

  public addZone(id: string): void {
    const newZone: IApplicationUserZone = {
      zoneId: id,
      createdOn: new Date(),
      visible: true
    };
    const zone = this.zones.find(z => z.id === id);
    zone.userHasZone = true;
    this.applicationUserZoneService.addUserZone(newZone);
  }

  public deleteZone(zoneId: string) {
    const zone = this.zones.find(z => z.id === zoneId);
    zone.userHasZone = false;
    return this.applicationUserZoneService.deleteUserZone(zoneId);
  }
}
