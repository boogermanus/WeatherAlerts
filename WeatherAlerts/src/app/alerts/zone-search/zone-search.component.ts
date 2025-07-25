import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { StateConstants } from '../../models/state-constants';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { IZoneProperties } from '../../interfaces/izone-properties';
import { IUserZone } from '../../interfaces/iuser-zone';
import { ZonesService } from '../../services/zones.service';
import { UserZoneService } from '../../services/user-zone.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ZonePipe } from '../pipes/zone.pipe';

function validateState(control: FormControl): ValidationErrors {
  const value = control.value;
  let valid = false;
  if (typeof value === 'object') {
    valid = true;
  }

  return valid ? null : { statesError: true };
}

@Component({
    selector: 'app-zone-search',
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
        MatTooltipModule,
        MatSelectModule,
    ],
    templateUrl: './zone-search.component.html',
    styleUrl: './zone-search.component.css'
})
export class ZoneSearchComponent implements OnInit, OnDestroy {
  public statesControl = new FormControl<any>('', validateState);
  public states: any[] = StateConstants.states;
  public statesFilter: Observable<any[]>;
  public zones: IZoneProperties[];
  public filter = '';
  public loading = false;
  public showTable = false;
  public userZones: IUserZone[] = []
  public typeSelected: string = 'public'
  public subscriptions: Subscription = new Subscription();

  constructor(private readonly zonesService: ZonesService,
    private readonly userZoneService: UserZoneService
  ) { }

  ngOnInit(): void {
    this.statesFilter = this.statesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.caption),
        map(caption => caption ? this.filterState(caption) : this.states.slice())
      )
    
    // this.userZones = await this.userZoneService.getUserZones();
    this.subscriptions.add(this.userZoneService.getUserZones()
      .subscribe({
        next: (data) => {
          this.userZones = data;
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    this.zonesService.getZonesByAreaAndType(this.statesControl.value.typeValue, this.typeSelected)
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

  public deleteZone(zoneId: string): void {
    this.subscriptions.add(this.userZoneService.deleteUserZone(zoneId)
      .subscribe({
        next: (data) => {
          const zone = this.zones.find(z => z.id === zoneId)
          zone.userHasZone = false;
        }
      }));
  }
}