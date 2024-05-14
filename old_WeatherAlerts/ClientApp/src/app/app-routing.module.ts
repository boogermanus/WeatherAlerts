import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: '**', component: HomeComponent, pathMatch: 'full', redirectTo: ''}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
