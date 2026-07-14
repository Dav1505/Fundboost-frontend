import {Injectable, inject, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { API_URL } from '../support/Constants';
import { Wallet } from '../objects/Wallet';
import { WalletTransaction } from '../objects/WalletTransaction';
import {PagedResponse} from '../objects/PagedResponse';

export interface DepositPayload {
  amount: number;
}
export interface PageQuery{
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
}

@Injectable({ providedIn: 'root' })
export class WalletService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/wallet`;

  readonly balance = signal<number | null>(null);

  refreshBalance(): void {
    this.getBalance().subscribe();
  }

  getBalance(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/balance`).pipe(
      tap(balance => this.balance.set(balance))
    );
  }

  deposit(payload: DepositPayload): Observable<Wallet> {
    return this.http.post<Wallet>(`${this.baseUrl}/deposit`, payload);
  }

  getTransactions(): Observable<WalletTransaction[]> {
    return this.http.get<WalletTransaction[]>(`${this.baseUrl}/transactions`);
  }

  getTransactionsPaged(query: PageQuery): Observable<PagedResponse<WalletTransaction>>{
    const params = new HttpParams()
      .set('pageNumber',query.pageNumber)
      .set('pageSize',query.pageSize)
      .set('sortBy',query.sortBy ?? 'id');

    return this.http.get<PagedResponse<WalletTransaction>>(`${this.baseUrl}/transactions/paged`,{params});
  }
}
