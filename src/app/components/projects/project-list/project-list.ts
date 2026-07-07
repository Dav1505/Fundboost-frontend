import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectService } from '../../../model/services/ProjectService';
import { Project } from '../../../model/objects/Project';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectListComponent implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.projectService.getOpenProjects().subscribe(projects => {
      this.projects.set(projects);
      this.loading.set(false);
    });
  }

  progressPercent(project: Project): number {
    return Math.min(100, (project.currentAmount / project.targetAmount) * 100);
  }
}
