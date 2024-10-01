import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.showToast('Test Message', 'success');
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Function to toggle confirm password visibility
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, username, email, password } = this.registerForm.value;
      this.errorMessage = null;
      this.isSubmitting = true;

      this.authService.register(email, password, name, username).subscribe(
        (user) => {
          this.isSubmitting = false;
          this.showToast('Registration successful!', 'success');
          this.router.navigate(['/blogs']);
        },
        (error) => {
          this.isSubmitting = false;
          if (error.code === 'auth/email-already-in-use') {
            this.errorMessage = 'This email is already in use.';
          } else if (error.code === 'auth/invalid-email') {
            this.errorMessage = 'Invalid email format.';
          } else if (error.code === 'auth/weak-password') {
            this.errorMessage = 'Password is too weak.';
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
          this.showToast(this.errorMessage, 'error');
        }
      );
    } else {
      this.markAllFieldsAsTouched();
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
