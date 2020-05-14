import { Component, OnInit } from '@angular/core';
import { StateConstants } from 'src/app/weather-api/models/state-constants';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ZonesService } from 'src/app/weather-api/services/zones.service';
import { IZonesResponse } from 'src/app/weather-api/interfaces/izones-response';
import { IZoneProperties } from 'src/app/weather-api/interfaces/izone-properties';

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

  constructor(private zonesService: ZonesService) { }

  ngOnInit() {
    this.statesFilter = this.statesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.caption),
        map(caption => caption ? this._filter(caption) : this.states.slice())
      );
  }

  public displayWith(value: any) {
    return value && value.typeValue ? value.caption : '';
  }

  public loadZones() {
    if (typeof this.statesControl.value !== 'object') {
      return;
    }

    this.zonesService.getZonesByArea(this.statesControl.value.typeValue)
      .then((data: IZonesResponse) => {
        this.zones = data.features.map(f => f.properties);
      });
  }

  private _filter(caption: string): any[] {
    return this.states.filter(option => option.caption.toLowerCase().startsWith(caption.toLowerCase()));
  }


}
