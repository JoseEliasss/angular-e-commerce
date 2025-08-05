import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminOnlyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authRaw = localStorage.getItem('authState');
  const user = authRaw ? JSON.parse(authRaw) : null;

  const isAdmin = user?.username === 'jose@gmail.com';

  if (!isAdmin) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
