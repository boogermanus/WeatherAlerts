import { Component } from '@angular/core';
import { AuthorizeService, IUser } from 'src/api-authorization/authorize.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  // this has a 'Z', angular date pipe will treat it correct;
  date1: Date = new Date('2020-05-19T00:21:09.636Z');
  // this does not have a 'Z', but because it was localy angular will still treat it correctly;
  date2: Date = new Date('2020-05-18T20:28:40.933');
  user: Observable<IUser>;
  constructor(private authService: AuthorizeService) {
    this.user = this.authService.getUser();
  }
}
