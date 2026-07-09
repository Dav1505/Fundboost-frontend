import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../model/services/UserService';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatCardModule
  ],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css'
})
export class OnboardingComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  submitting = signal(false);

  submit(): void {
    this.submitting.set(true);

    this.userService.register().subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/projects']);
      },
      error: () => this.submitting.set(false)
    });
  }
}
