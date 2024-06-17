import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  authService.isAuthenticated.subscribe({
    next: (data) => {
      if (data) {
        return true;
      }
      else {
        router.navigate(['auth/login']);
        return false;
      }
    }
  });
  return false;
};
