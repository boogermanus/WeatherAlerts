import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts/alerts.component';
import { AlertViewComponent } from './alerts/alert-view/alert-view.component';
import { LoginComponent } from './auth/login/login.component';
import { ZonesComponent } from './alerts/zones/zones.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { MyZonesComponent } from './alerts/my-zones/my-zones.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'alerts', component: AlertsComponent },
    { path: 'alerts/:id', component: AlertViewComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'zones', component: ZonesComponent, canActivate: [authGuard] },
    { path: 'myzones', component: MyZonesComponent, canActivate: [authGuard] },
    { path: '**', component: HomeComponent, pathMatch: 'full', redirectTo: '' },
];
