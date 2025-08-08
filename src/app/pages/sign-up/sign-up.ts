import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/authentication/auth';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [Header, Footer, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.signupForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(100)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(200),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Custom Validator
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  createAcc() {
    if (this.signupForm.valid) {
      const fullName = this.signupForm.value.name.trim().split(' ');
      const firstName = fullName[0];
      const lastName = fullName.slice(1).join(' ') || ' ';

      const signupData = {
        Firstname: firstName,
        Lastname: lastName,
        Email: this.signupForm.value.email,
        Password: this.signupForm.value.password,
        RoleName: 'User',
      };

      console.log('Sending signup data:', signupData);

      this.authService.signup(signupData).subscribe({
        next: (response) => {
          console.log('Signup successful!', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error', error.error || error);
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get f() {
    return this.signupForm.controls;
  }
}
