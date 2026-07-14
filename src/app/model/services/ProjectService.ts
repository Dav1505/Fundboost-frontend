import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../support/Constants';
import { Project } from '../objects/Project';
import {ProjectDetailsDTO} from '../objects/ProjectDetailsDTO';
import {PagedResponse} from '../objects/PagedResponse';
import {ProjectDetailsPagedDTO} from '../objects/ProjectDetailsPagedDTO';

export interface CreateProjectPayload {
  title: string;
  description: string;
  targetAmount: number;
  deadline: string;
}
export interface PageQuery{
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/projects`;

  getOpenProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getOpenProjectsPaged(query: PageQuery): Observable<PagedResponse<Project>>{
    const params = new HttpParams()
      .set('pageNumber',query.pageNumber)
      .set('pageSize',query.pageSize)
      .set('sortBy',query.sortBy ?? 'id');

    return this.http.get<PagedResponse<Project>>(`${this.baseUrl}/paged`,{params});
  }

  getMyProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/my-projects`);
  }

  getMyProjectsPaged(query: PageQuery): Observable<PagedResponse<Project>>{
    const params = new HttpParams()
      .set('pageNumber',query.pageNumber)
      .set('pageSize',query.pageSize)
      .set('sortBy',query.sortBy ?? 'id');

    return this.http.get<PagedResponse<Project>>(`${this.baseUrl}/my-projects/paged`,{params});
  }

  createProject(payload: CreateProjectPayload): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, payload);
  }

  getProjectDetails(projectId: number): Observable<ProjectDetailsDTO> {
    return this.http.get<ProjectDetailsDTO>(`${this.baseUrl}/${projectId}`);
  }

  getProjectsDetailsPaged(projectId: number, query: PageQuery): Observable<ProjectDetailsPagedDTO>{
    const params = new HttpParams()
      .set('pageNumber',query.pageNumber)
      .set('pageSize',query.pageSize)
      .set('sortBy',query.sortBy ?? 'id');

    return this.http.get<ProjectDetailsPagedDTO>(`${this.baseUrl}/${projectId}/paged`,{params});
  }
}
