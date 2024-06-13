import { Component, Input } from '@angular/core';
import { IAlertProperties } from '../../interfaces/ialert-properties';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlertProperties } from '../../models/alert-properties';
import { SeverityConstants } from '../../models/severity-constants';
import { MatCardModule } from '@angular/material/card'
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alert-view',
  standalone: true,
  imports: [MatCardModule,MatTooltipModule, MatIconModule, CommonModule],
  templateUrl: './alert-view.component.html',
  styleUrl: './alert-view.component.css'
})
export class AlertViewComponent {
  readonly ID = 'id';
  // replace this def with the other and get an error.
  // alert: IAlertProperties
  @Input() alert: IAlertProperties = new AlertProperties();
  @Input() showBackButton = true;
  severity: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router) { }

    ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params[this.ID];

    this.alertService.getAlertById(id)
      .subscribe(
        {
          next: (data) => {
            this.alert = this.alertService.mapAlertResponseToAlertProperties(data);
            this.severity = SeverityConstants.getSeverityClass(this.alert.severity);
          },
          error: (error) => console.log(error)
        });
  }

  back(): void {
    this.router.navigate(['/alerts']);
  }
}
