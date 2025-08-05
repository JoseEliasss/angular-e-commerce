import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const RedirectIfLoggedInGuard: CanActivateFn = () => {
  const router = inject(Router);

  const authRaw = localStorage.getItem('authState');
  const loggedIn = authRaw ? JSON.parse(authRaw)?.loggedIn === true : false;

  if (loggedIn) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
