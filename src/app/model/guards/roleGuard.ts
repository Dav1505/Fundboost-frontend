import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Router } from '@angular/router';

export const userRoleGuard: CanActivateFn = () => {
  const keycloak = inject(Keycloak);
  const router = inject(Router);

  const roles = keycloak.tokenParsed?.resource_access?.['fundboost-client']?.roles ?? [];
  const hasUserRole = roles.includes('USER');

  if (!hasUserRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
