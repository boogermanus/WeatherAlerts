import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { StateConstants } from '../../models/state-constants';
import { Observable, map, startWith } from 'rxjs';
import { IZoneProperties } from '../../interfaces/izone-properties';
import { CommonModule } from '@angular/common';
import { ZonesService } from '../../services/zones.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ZonePipe } from "../pipes/zone.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

function validateState(control: FormControl): ValidationErrors {
  const value = control.value;
  let valid = false;
  if (typeof value === 'object') {
    valid = true;
  }

  return valid ? null : { statesError: true };
}

@Component({
  selector: 'app-zones',
  standalone: true,
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ZonePipe,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class ZonesComponent implements OnInit {
  statesControl = new FormControl<any>('', validateState);
  states: any[] = StateConstants.states;
  statesFilter: Observable<any[]>;
  zones: IZoneProperties[];
  filter = '';
  loading = false;
  showTable = false;

  constructor(private zonesService: ZonesService) { }

  ngOnInit(): void {
    this.statesFilter = this.statesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.caption),
        map(caption => caption ? this.filterState(caption) : this.states.slice())
      )
  }

  private filterState(caption: string): any[] {
    return this.states
      .filter(option => option.caption
        .toLowerCase()
        .startsWith(caption.toLowerCase()));
  }

  public loadZones(): void {
    if (typeof this.statesControl.value !== 'object') {
      return;
    }

    this.loading = true;
    this.showTable = false;
    this.zonesService.getZonesByArea(this.statesControl.value.typeValue)
      .subscribe({
        next: (data) => {
          this.zones = data.features.map(f => f.properties)
          this.loading = false;
          this.showTable = true;
          this.filter = '';
        }
      });
  }

  public displayWith(value: any): string {
    return value && value.typeValue ? value.caption : '';
  }
}
