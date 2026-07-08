import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../model/services/UserService';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css'
})
export class OnboardingComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  submitting = signal(false);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) return;

    this.submitting.set(true);
    const { firstName, lastName } = this.form.getRawValue();

    this.userService.register({ firstName, lastName }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/projects']);
      },
      error: () => this.submitting.set(false)
    });
  }
}
