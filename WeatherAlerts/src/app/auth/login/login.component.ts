import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule,ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
      this.formLogin = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['',Validators.required]
      });

    }
  ngOnInit(): void {
    
  }

  public submit() : void {}
  public register() : void {}

  public getError(pControlName: string) {
    return this.formLogin.controls[pControlName].touched
    && this.formLogin.controls[pControlName].hasError('required');
  }

}
