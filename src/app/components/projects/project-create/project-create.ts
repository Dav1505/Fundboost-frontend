import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../../model/services/ProjectService';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule
  ],
  templateUrl: './project-create.html',
  styleUrl: './project-create.css'
})
export class ProjectCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    targetAmount: [0, [Validators.required, Validators.min(0.01)]],
    deadline: [null as Date | null, Validators.required]
  });

  submit(): void {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();
    this.projectService.createProject({
      title: raw.title,
      description: raw.description,
      targetAmount: raw.targetAmount,
      deadline: raw.deadline!.toISOString()
    }).subscribe(project => {
      this.router.navigate(['/projects', project.id]);
    });
  }
}
