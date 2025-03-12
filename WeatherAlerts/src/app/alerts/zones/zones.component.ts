import { Component, OnDestroy, OnInit } from '@angular/core';
import { ZonesService } from '../../services/zones.service';
import { UserZoneService } from '../../services/user-zone.service';
import { ZoneSearchComponent } from '../zone-search/zone-search.component';


@Component({
  selector: 'app-zones',
  standalone: true,
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css',
  imports: [
    ZoneSearchComponent,
  ]
})
export class ZonesComponent implements OnInit, OnDestroy {

  constructor(private zonesService: ZonesService,
    private readonly userZoneService: UserZoneService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
