import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    console.log('Token set:', token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  login(credentials: { Username: string; Password: string }): Observable<any> {
    return this.http
      .post<any>('http://192.168.7.156:5005/api/User/Login()', credentials)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  signup(data: {
    Firstname: string;
    Lastname: string;
    Username: string;
    Password: string;
    RoleName: string;
  }): Observable<any> {
    return this.http
      .post<any>('http://192.168.7.156:5005/api/User/Signup()', data)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
  }
}
