import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectService } from '../../../model/services/ProjectService';
import {WalletService} from '../../../model/services/WalletService';
import { DonateFormComponent } from './donate-form/donate-form';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ProjectDetailsPagedDTO} from '../../../model/objects/ProjectDetailsPagedDTO';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatProgressBarModule, DonateFormComponent, MatPaginator],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly walletService = inject(WalletService);

  details = signal<ProjectDetailsPagedDTO | null>(null);
  pageIndex = signal(0);
  pageSize = signal(5);
  projectId!: number;

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetails();
  }

  loadDetails(): void {
    this.projectService.getProjectsDetailsPaged(this.projectId, {
      pageNumber: this.pageIndex(),
      pageSize: this.pageSize()
    }).subscribe(dto => this.details.set(dto));
  }

  onContributionsPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadDetails();
  }

  onDonationSuccess(): void {
    this.pageIndex.set(0); // torna alla prima pagina per mostrare subito la nuova donazione
    this.loadDetails();
    this.walletService.refreshBalance();
  }
}
