import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_URL } from '../support/Constants';
import { Contribution } from '../objects/Contribution';

export interface DonatePayload {
  amount: number;
}

interface EmptyContributionsResponse {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContributionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/projects`;

  donate(projectId: number, payload: DonatePayload): Observable<Contribution> {
    return this.http.post<Contribution>(`${this.baseUrl}/${projectId}/donate`, payload);
  }
}
