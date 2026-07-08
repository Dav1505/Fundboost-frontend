import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import { API_URL } from '../support/Constants';
import { User } from '../objects/User';
import {SKIP_ERROR_NOTIFICATION} from '../support/skip-error-notification';

export interface RegisterUserPayload {
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/user`;
  private readonly walletBalanceUrl = `${API_URL}/wallet/balance`

  register(payload: RegisterUserPayload): Observable<User> {
    return this.http.post<User>(this.baseUrl, payload);
  }
  // Sfrutta il 404 di /wallet/balance come segnale di "utente non ancora registrato"
  isRegistered(): Observable<boolean> {
    const context = new HttpContext().set(SKIP_ERROR_NOTIFICATION, true);

    return this.http.get<number>(this.walletBalanceUrl, { context }).pipe(
      map(() => true),
      catchError(err => {
        if (err.status === 404) {
          return of(false);
        }
        return throwError(() => err); // altri errori (401, 500...) restano gestiti normalmente
      })
    );
  }
}
