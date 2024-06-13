import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts/alerts.component';
import { AlertViewComponent } from './alerts/alert-view/alert-view.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'alerts', component: AlertsComponent },
    { path: 'alerts/:id', component: AlertViewComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: '**', component: HomeComponent, pathMatch: 'full', redirectTo: '' },
];
