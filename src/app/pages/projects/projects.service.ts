import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(
    private http: HttpClient
  ) { }

  getProjects(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects`);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/projects`, projectData);
  }
}
