import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContributionService } from '../../../../model/services/ContributionService';
import {positiveAmountValidator} from '../../../../model/support/positive-amount-validator';

@Component({
  selector: 'app-donate-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './donate-form.html',
  styleUrl: './donate-form.css'
})
export class DonateFormComponent {
  projectId = input.required<number>();
  donated = output<void>();

  private readonly fb = inject(FormBuilder);
  private readonly contributionService = inject(ContributionService);

  submitting = signal(false);

  form = this.fb.nonNullable.group({
    amount: [0, [Validators.required, positiveAmountValidator]]
  });

  submit(): void {
    if (this.form.invalid) return;

    this.submitting.set(true);
    const amount = this.form.getRawValue().amount;

    this.contributionService.donate(this.projectId(), { amount }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.form.reset({ amount: 0 });
        this.donated.emit();
      },
      error: () => {
        this.submitting.set(false);
      }
    });
  }
}
