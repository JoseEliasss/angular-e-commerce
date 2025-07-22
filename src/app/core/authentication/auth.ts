import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'https://your-api.com/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  public handleLogin(
    credentials: { email: string; password: string },
    onError: (msg: string) => void
  ): void {
    this.http.post<{ token: string }>(this.apiUrl, credentials).subscribe({
      next: (res) => {
        this.setToken(res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        onError('Login failed. Please try again.');
      },
    });
  }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
