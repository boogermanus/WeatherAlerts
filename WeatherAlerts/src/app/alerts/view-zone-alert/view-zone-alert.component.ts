import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertViewComponent } from '../alert-view/alert-view.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { IAlertProperties } from '../../interfaces/ialert-properties';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-view-zone-alert',
    imports: [
        AlertViewComponent,
        MatProgressSpinnerModule,
        MatExpansionModule,
        CommonModule
    ],
    templateUrl: './view-zone-alert.component.html',
    styleUrl: './view-zone-alert.component.css'
})
export class ViewZoneAlertComponent implements OnInit, OnDestroy {
  @Input()zoneId: string;
  public alertCount: number = 0;
  public loading = true;
  public alerts: IAlertProperties[] = []
  private subscriptions: Subscription = new Subscription();

  constructor(private readonly alertService: AlertService) {}

  public ngOnInit(): void {
    this.subscriptions.add(this.alertService.getAlertsByZoneId(this.zoneId)
      .subscribe({
        next: (data) => {
          this.alerts = data.features.map(f => this.alertService.mapAlertsToAlertProperties(f));
          this.loading = false;
          this.alertCount = this.alerts.length;
        }
      }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
