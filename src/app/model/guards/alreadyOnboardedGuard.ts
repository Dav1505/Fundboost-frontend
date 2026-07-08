import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/UserService';

export const alreadyOnboardedGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isRegistered().pipe(
    map(registered => {
      if (registered) {
        return router.createUrlTree(['/projects']);
      }
      return true;
    })
  );
};
