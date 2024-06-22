import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { StateConstants } from '../../models/state-constants';
import { Observable, Subscription, map, startWith } from 'rxjs';
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
import { IUserZone } from '../../interfaces/iuser-zone';
import { UserZoneService } from '../../services/user-zone.service';

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
  public statesControl = new FormControl<any>('', validateState);
  public states: any[] = StateConstants.states;
  public statesFilter: Observable<any[]>;
  public zones: IZoneProperties[];
  public filter = '';
  public loading = false;
  public showTable = false;
  public userZones: IUserZone[] = []

  constructor(private zonesService: ZonesService,
    private readonly userZoneService: UserZoneService
  ) { }

  async ngOnInit(): Promise<void> {
    this.statesFilter = this.statesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.caption),
        map(caption => caption ? this.filterState(caption) : this.states.slice())
      )
    
    this.userZones = await this.userZoneService.getUserZones();
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

          for(const zone of this.zones) {
            zone.userHasZone = this.userZones.findIndex(uz => uz.zoneId === zone.id) !== -1 ? true : false;
          }
        }
      });
  }

  public displayWith(value: any): string {
    return value && value.typeValue ? value.caption : '';
  }

  public addZone(id: string): void {
    const newZone: IUserZone = {
      zoneId: id,
      createDate: new Date(),
      visible: true
    };

    const zone = this.zones.find(z => z.id === id);
    zone.userHasZone = true;
    this.userZoneService.addUserZone(newZone);
  }

  public deleteZone(zoneId: string): Promise<any> {
    const zone = this.zones.find(z => z.id === zoneId);
    zone.userHasZone = false;
    return this.userZoneService.deleteUserZone(zoneId);
  }
}
