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

  updateStageResult(stageResultId: string, stageResultPayload: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/stage_results/${stageResultId}`, stageResultPayload);
  }

  getStageById(stageId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/stages/${stageId}`);
  }
}
