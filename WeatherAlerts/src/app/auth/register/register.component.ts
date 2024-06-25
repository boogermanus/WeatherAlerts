import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterModel } from '../../models/register-model';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy{

  public form: FormGroup;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public confirmPasswordControl: FormControl;
  public unableToRegister = false;
  public registrationSuccessful = false;
  private subscription: Subscription;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.emailControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    this.passwordControl = new FormControl('', Validators.required);
    this.confirmPasswordControl = new FormControl('', Validators.required);

    this.form = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    },
      {
        validators: this.passwordValidator
      })
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public passwordValidator(control: AbstractControl): ValidationErrors {
    // assumes that the form has a 'password' and 'confirmPassword' controls
    const password = control.get('password');
    const confirm = control.get('confirmPassword');

    if (confirm.value !== '' && password.value !== confirm.value) {
      return { password: true };
    }

    return null;
  }

  public submit(): void {
    this.subscription = this.authService.register(
      new RegisterModel(this.emailControl.value, this.passwordControl.value, this.confirmPasswordControl.value))
      .subscribe({
        next: (data) => {
          if (data) {
            this.registrationSuccessful = true;
          }
        },
        error: (error) => {
          this.unableToRegister = true;
          console.log(error);
        }
      });
  }

  public isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
    return control.touched && control.hasError(error);
  }
}
