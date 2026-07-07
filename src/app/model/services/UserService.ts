import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../support/Constants';
import { User } from '../objects/User';

export interface RegisterUserPayload {
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/user`;

  register(payload: RegisterUserPayload): Observable<User> {
    return this.http.post<User>(this.baseUrl, payload);
  }
}
