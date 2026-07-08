import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WalletService } from '../../../model/services/WalletService';

@Component({
  selector: 'app-wallet-balance',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './wallet-balance.html',
  styleUrl: './wallet-balance.css'
})
export class WalletBalanceComponent implements OnInit {
  readonly walletService = inject(WalletService);

  ngOnInit(): void {
    this.walletService.getBalance().subscribe();
  }
}
