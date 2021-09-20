import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StageResultsService {

  constructor(private http: HttpClient) {}

  getProjectStageResults(projectId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/stage_results/project/${projectId}`);
  }

  getNextStage(currentStageIndex: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/stages/next`, { index: currentStageIndex });
  }

  submitStage(stagePayload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/stage_results`, stagePayload);
  }
}
