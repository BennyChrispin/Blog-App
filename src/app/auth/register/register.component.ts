import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { register } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.state';
import { ToastrService } from 'ngx-toastr';
import {
  selectAuthError,
  selectAuthSuccess,
} from '../../../store/auth/auth.selectors';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    // Subscribe to registration success and error
    this.store
      .select(selectAuthError)
      .pipe(filter((error) => !!error))
      .subscribe((error) => {
        this.isSubmitting = false;
        this.handleRegistrationError(error);
        this.showToast(this.errorMessage, 'error');
      });

    this.store
      .select(selectAuthSuccess)
      .pipe(
        filter((success) => success),
        take(1)
      )
      .subscribe(() => {
        this.isSubmitting = false;
        this.showToast('Registration successful!', 'success');
        this.router.navigate(['/blogs']);
        this.registerForm.reset();
      });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.isSubmitting = true;

      // Dispatch the register action
      this.store.dispatch(register({ email, password }));

      // Reset the errorMessage
      this.errorMessage = '';

      // Listen for registration success or failure
      this.store
        .select(selectAuthError)
        .pipe(
          filter((error) => !!error),
          take(1)
        )
        .subscribe((error) => {
          this.isSubmitting = false;
          if (error) {
            this.handleRegistrationError(error);
            this.showToast(this.errorMessage, 'error');
          } else {
            this.showToast('Registration successful!', 'success');
            this.router.navigate(['/blogs']);
            this.registerForm.reset();
          }
        });
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  handleRegistrationError(error: any) {
    console.error('Registration Error:', error);
    // Check for specific Firebase error
    if (error === 'This email is already in use.') {
      this.errorMessage = 'This email is already in use.';
    } else {
      this.errorMessage = 'An unexpected error occurred.';
    }
  }

  showToast(message: string, type: 'success' | 'error') {
    if (type === 'success') {
      this.toastr.success(message, 'Success');
    } else if (type === 'error') {
      this.toastr.error(message, 'Error');
    }
  }

  private markAllFieldsAsTouched() {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
