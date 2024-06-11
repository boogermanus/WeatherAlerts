import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts/alerts.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: "alerts", component: AlertsComponent},
    { path: '**', component: HomeComponent, pathMatch: 'full', redirectTo: '' },
];