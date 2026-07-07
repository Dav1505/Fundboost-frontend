import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../support/Constants';
import { Project } from '../objects/Project';
import {ProjectDetailsDTO} from '../objects/ProjectDetailsDTO';

export interface CreateProjectPayload {
  title: string;
  description: string;
  targetAmount: number;
  deadline: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/projects`;

  getOpenProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getMyProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/my-projects`);
  }

  createProject(payload: CreateProjectPayload): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, payload);
  }

  getProjectDetails(projectId: number): Observable<ProjectDetailsDTO> {
    return this.http.get<ProjectDetailsDTO>(`${this.baseUrl}/${projectId}`);
  }
}
