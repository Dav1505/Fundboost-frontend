import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WalletService } from '../../../model/services/WalletService';

@Component({
  selector: 'app-wallet-deposit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './wallet-deposit.html',
  styleUrl: './wallet-deposit.css'
})
export class WalletDepositComponent {
  deposited = output<void>();

  private readonly fb = inject(FormBuilder);
  private readonly walletService = inject(WalletService);

  submitting = signal(false);

  form = this.fb.nonNullable.group({
    amount: [0, [Validators.required, Validators.min(0.01)]]
  });

  submit(): void {
    if (this.form.invalid) return;

    this.submitting.set(true);
    const amount = this.form.getRawValue().amount;

    this.walletService.deposit({ amount }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.form.reset({ amount: 0 });
        this.walletService.refreshBalance();
        this.deposited.emit();
      },
      error: () => this.submitting.set(false)
    });
  }
}
