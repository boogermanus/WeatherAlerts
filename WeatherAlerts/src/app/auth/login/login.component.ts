import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from '../../models/auth-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  public formLogin: FormGroup
  public loginError = false;
  public otherLoginError = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public submit(): void {
    if (this.formLogin.controls['email'].valid && this.formLogin.controls['password'].valid) {
      this.subscription = this.authService.login(
        new AuthModel(this.formLogin.controls['email'].value, this.formLogin.controls['password'].value))
        .subscribe({
          next: (response) => {
            this.authService.authenticate(response.access_token);
            this.router.navigate(['/']);
          },
          error: (error) => this.handleLoginError(error)
        });

    }
  }

  private handleLoginError(error: any) {
    if (error.status === 401) {
      this.loginError = true;
      this.otherLoginError = false;
    } else {
      this.otherLoginError = true;
      this.loginError = false;
    }
    console.log(error);
  }

  public getError(pControlName: string) {
    return this.formLogin.controls[pControlName].touched
      && this.formLogin.controls[pControlName].hasError('required');
  }

  public register(): void {
    this.router.navigate(['auth/register']);
  }
}
