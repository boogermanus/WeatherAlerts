import { Component, Input, OnInit } from '@angular/core';
import { AlertViewComponent } from '../alert-view/alert-view.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { IAlertProperties } from '../../interfaces/ialert-properties';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-zone-alert',
  standalone: true,
  imports: [
    AlertViewComponent,
    MatProgressSpinnerModule,
    MatExpansionModule,
    CommonModule
  ],
  templateUrl: './view-zone-alert.component.html',
  styleUrl: './view-zone-alert.component.css'
})
export class ViewZoneAlertComponent implements OnInit {
  @Input()zoneId: string;
  loading = true;
  alerts: IAlertProperties[] = []

  constructor(private readonly alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlertsByZoneId(this.zoneId)
      .subscribe({
        next: (data) => {
          this.alerts = data.features.map(f => this.alertService.mapAlertsToAlertProperties(f));
          this.loading = false;
        }
      });
  }

}
