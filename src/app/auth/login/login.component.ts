import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  LoginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize form in the constructor
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  // Handle form submission
  onSubmit() {
    if (this.LoginForm.valid) {
      console.log('Form Submitted', this.LoginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
