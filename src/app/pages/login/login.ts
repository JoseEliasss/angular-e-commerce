import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/authentication/auth';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { loginSuccess } from '../../state/auth/auth.actions'; // <-- import this

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Header, Footer, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
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
    });
  }

  loginAcc() {
    if (this.loginForm.valid) {
      const credentials = {
        Username: this.loginForm.value.email,
        Password: this.loginForm.value.password,
      };

      this.authService
        .login(credentials, (msg: string) => {
          this.errorMessage = msg;
        })
        .subscribe({
          next: (res) => {
            this.store.dispatch(
              loginSuccess({ username: credentials.Username })
            );

            const returnUrl =
              this.route.snapshot.queryParamMap.get('returnUrl') || '/';
            this.router.navigate([returnUrl]);
          },
          error: (err) => {
            this.errorMessage = 'Login failed. Please try again.';
            console.error(err);
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  get f() {
    return this.loginForm.controls;
  }
}
