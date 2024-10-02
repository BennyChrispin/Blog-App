import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { login } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.state';
import {
  selectAuthError,
  selectAuthSuccess,
} from '../../../store/auth/auth.selectors';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    // Handle login success
    this.store
      .select(selectAuthSuccess)
      .pipe(filter((success) => success))
      .subscribe(() => {
        this.toastr.success('Login successful!', 'Success');
        this.router.navigate(['/blogs']);
      });

    // Handle login error
    this.store
      .select(selectAuthError)
      .pipe(filter((error) => !!error))
      .subscribe((error) => {
        this.toastr.error(
          error || 'An unknown error occurred.',
          'Login Failed'
        );
      });
  }

  // Add Google sign-in logic
  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe({
      next: (user) => {
        console.log('Google Sign-In successful', user);
        this.router.navigate(['/blogs']);
        this.toastr.success('Google Sign-In successful!', 'Success');
      },
      error: (error) => {
        this.toastr.error(error.message, 'Google Sign-In Failed');
      },
    });
  }

  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Handle login form submission
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Dispatch the login action
      this.store.dispatch(login({ email, password }));
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  private markAllFieldsAsTouched() {
    Object.values(this.loginForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
