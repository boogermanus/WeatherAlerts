import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from '../../models/auth-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup
  public loginError = false;
  public otherLoginError = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });


  }
  ngOnInit(): void {

  }

  public submit(): void { 
    if (this.formLogin.controls['email'].valid && this.formLogin.controls['password'].valid) {
      this.authService.login(
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
}
