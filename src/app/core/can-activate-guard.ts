import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './authentication/auth';
import { Router } from '@angular/router';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
//bado yred observable so khali yaamol pipe w yaamol observable
