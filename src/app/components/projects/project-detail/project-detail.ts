import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectService } from '../../../model/services/ProjectService';
import {WalletService} from '../../../model/services/WalletService';
import { ProjectDetailsDTO } from '../../../model/objects/ProjectDetailsDTO';
import { DonateFormComponent } from './donate-form/donate-form';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatProgressBarModule, DonateFormComponent],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly walletService = inject(WalletService);

  details = signal<ProjectDetailsDTO | null>(null);
  projectId!: number;

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetails();
  }

  loadDetails(): void {
    this.projectService.getProjectDetails(this.projectId).subscribe(dto => {
      this.details.set(dto);
    });
  }

  onDonationSuccess(): void {
    this.loadDetails();
    this.walletService.refreshBalance();
  }
}
