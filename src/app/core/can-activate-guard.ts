import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './authentication/auth'; // Make sure this path is correct
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canActivateGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return of(authService.isLoggedIn()).pipe(
    tap((loggedIn) => {
      if (!loggedIn) {
        router.navigate(['/about']);
      }
    }),
    map((loggedIn) => loggedIn)
  );
};
