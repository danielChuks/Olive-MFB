/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  SignUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.SignUpForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  ngOnInit() {}

  validatePassword(): boolean {
    return (
      this.SignUpForm.value.password === this.SignUpForm.value.confirmPassword
    );
  }
}
