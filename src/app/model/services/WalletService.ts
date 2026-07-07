import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../support/Constants';
import { Wallet } from '../objects/Wallet';
import { WalletTransaction } from '../objects/WalletTransaction';

export interface DepositPayload {
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class WalletService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/wallet`;

  getBalance(): Observable<number> {
    // Attenzione: l'endpoint ritorna un BigDecimal grezzo, non un oggetto wrapper
    return this.http.get<number>(`${this.baseUrl}/balance`);
  }

  deposit(payload: DepositPayload): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.baseUrl}/deposit`, payload);
  }

  getTransactions(): Observable<WalletTransaction[]> {
    return this.http.get<WalletTransaction[]>(`${this.baseUrl}/transactions`);
  }
}
