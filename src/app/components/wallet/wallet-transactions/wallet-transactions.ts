import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { WalletService } from '../../../model/services/WalletService';
import { WalletTransaction } from '../../../model/objects/WalletTransaction';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-wallet-transactions',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatPaginator],
  templateUrl: './wallet-transactions.html',
  styleUrl: './wallet-transactions.css'
})
export class WalletTransactionsComponent {
  private readonly walletService = inject(WalletService);

  transactions = signal<WalletTransaction[]>([]);
  totalElements = signal(0);
  pageSize = signal(9);
  pageIndex = signal(0);
  loading = signal(true);

  constructor() {
    this.loadPage();
  }

  loadPage(): void{
    this.loading.set(true);
    this.walletService.getTransactionsPaged({
      pageNumber: this.pageIndex(),
      pageSize: this.pageSize()
    }).subscribe(res => {
      this.transactions.set(res.content);
      this.totalElements.set(res.totalElements);
      this.loading.set(false);
    });
  }

  onPageChange(event: PageEvent): void{
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadPage();
  }

  refresh(): void {
    this.pageIndex.set(0);
    this.loadPage();
  }

  iconFor(type: WalletTransaction['transactionType']): string {
    switch (type) {
      case 'DEPOSIT': return 'add_circle';
      case 'DONATION': return 'volunteer_activism';
      case 'REFUND': return 'undo';
    }
  }
}
