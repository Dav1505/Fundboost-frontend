import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { WalletService } from '../../../model/services/WalletService';
import { WalletTransaction } from '../../../model/objects/WalletTransaction';

@Component({
  selector: 'app-wallet-transactions',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './wallet-transactions.html',
  styleUrl: './wallet-transactions.css'
})
export class WalletTransactionsComponent implements OnInit {
  private readonly walletService = inject(WalletService);

  transactions = signal<WalletTransaction[]>([]);

  ngOnInit(): void {
    this.walletService.getTransactions().subscribe(t => this.transactions.set(t));
  }

  refresh(): void {
    this.walletService.getTransactions().subscribe(t => this.transactions.set(t));
  }

  iconFor(type: WalletTransaction['transactionType']): string {
    switch (type) {
      case 'DEPOSIT': return 'add_circle';
      case 'DONATION': return 'volunteer_activism';
      case 'REFUND': return 'undo';
    }
  }
}
