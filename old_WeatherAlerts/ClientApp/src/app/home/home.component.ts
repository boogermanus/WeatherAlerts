import { Component } from '@angular/core';
import { AuthorizeService, IUser } from 'src/api-authorization/authorize.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  user: Observable<IUser>;
  constructor(private authService: AuthorizeService) {
    this.user = this.authService.getUser();
  }
}
