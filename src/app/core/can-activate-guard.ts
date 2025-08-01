import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const canActivateGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Check localStorage for auth state
  const authRaw = localStorage.getItem('authState');
  const loggedIn = authRaw ? JSON.parse(authRaw)?.loggedIn === true : false;

  if (!loggedIn) {
    // Redirect unauthenticated users to login
    router.navigate(['/login']);
    return false;
  }

  return true; // Allow access
};
