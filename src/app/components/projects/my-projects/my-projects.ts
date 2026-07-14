import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../../model/services/ProjectService';
import { Project } from '../../../model/objects/Project';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatProgressBar, MatPaginator],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.css'
})
export class MyProjectsComponent{
  private readonly projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  totalElements = signal(0);
  pageSize = signal(9);
  pageIndex = signal(0);
  loading = signal(true);

  constructor() {
    this.loadPage();
  }

  loadPage(): void {
    this.loading.set(true);
    this.projectService.getMyProjectsPaged({
      pageNumber: this.pageIndex(),
      pageSize: this.pageSize()
    }).subscribe(res => {
      this.projects.set(res.content);
      this.totalElements.set(res.totalElements);
      this.loading.set(false);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadPage();
  }

  progressPercent(project: Project): number {
    return Math.min(100, (project.currentAmount / project.targetAmount) * 100);
  }
}
