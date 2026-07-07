import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../../model/services/ProjectService';
import { Project } from '../../../model/objects/Project';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressBar],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.css'
})
export class MyProjectsComponent implements OnInit {
  private readonly projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.projectService.getMyProjects().subscribe(projects => {
      this.projects.set(projects);
      this.loading.set(false);
    });
  }
  progressPercent(project: Project): number {
    return Math.min(100, (project.currentAmount / project.targetAmount) * 100);
  }
}
