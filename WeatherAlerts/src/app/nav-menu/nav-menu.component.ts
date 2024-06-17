import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent implements OnInit {
  isExpanded: boolean = false;
  public isAuthenticated: Observable<boolean>;

  constructor(private authService: AuthService) {

  }

  public ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  public collapse(): void {
    this.isExpanded = false;
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public logout(): void {
    this.authService.logout();
  }

}
