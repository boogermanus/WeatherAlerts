import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts/alerts.component';
import { AlertViewComponent } from './alerts/alert-view/alert-view.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'alerts', component: AlertsComponent},
    { path: 'alerts/:id', component: AlertViewComponent},
    { path: '**', component: HomeComponent, pathMatch: 'full', redirectTo: '' },
];
