import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Keycloak from 'keycloak-js';
import { MatSnackBar } from '@angular/material/snack-bar';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(Keycloak);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const backendMessage = error.error?.message ?? 'Errore imprevisto, riprova.';

      switch (error.status) {
        case 401:
          keycloak.login();
          break;
        case 403:
          snackBar.open('Non hai i permessi per questa operazione.', 'Chiudi', { duration: 4000 });
          break;
        case 409:
        case 400:
        case 404:
          snackBar.open(backendMessage, 'Chiudi', { duration: 4000 });
          break;
        default:
          snackBar.open('Errore del server, riprova più tardi.', 'Chiudi', { duration: 4000 });
      }

      return throwError(() => error);
    })
  );
};
