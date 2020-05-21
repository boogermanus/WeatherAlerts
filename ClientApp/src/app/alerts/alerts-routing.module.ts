import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertsViewComponent } from './alerts-view/alerts-view.component';
import { ZonesComponent } from './zones/zones.component';
import { MyZonesComponent } from './my-zones/my-zones.component';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';


const routes: Routes = [
  { path: 'alerts/:id', component: AlertsViewComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'zones', component: ZonesComponent },
  { path: 'myzones', component: MyZonesComponent, canActivate: [AuthorizeGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
