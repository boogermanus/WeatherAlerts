import { Component } from '@angular/core';
import {MatTableModule} from "@angular/material/table";
@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {

}
