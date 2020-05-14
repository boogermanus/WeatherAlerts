import { Component, OnInit } from '@angular/core';
import { StateConstants } from 'src/app/weather-api/models/state-constants';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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

  constructor() { }

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

  private _filter(caption: string): any[] {
    return this.states.filter(option => option.caption.toLowerCase().startsWith(caption.toLowerCase()));
  }


}
