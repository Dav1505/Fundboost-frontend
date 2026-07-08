import { Component, viewChild } from '@angular/core';
import { WalletBalanceComponent } from './wallet-balance/wallet-balance';
import { WalletDepositComponent } from './wallet-deposit/wallet-deposit';
import { WalletTransactionsComponent } from './wallet-transactions/wallet-transactions';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [WalletBalanceComponent, WalletDepositComponent, WalletTransactionsComponent],
  templateUrl: './wallet.html',
  styleUrl: './wallet.css'
})
export class WalletComponent {
  private readonly transactionsList = viewChild.required(WalletTransactionsComponent);

  onDeposited(): void {
    this.transactionsList().refresh();
  }
}
