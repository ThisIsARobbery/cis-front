import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StageResult } from 'src/app/types/stage-result.type';
import { Stage } from 'src/app/types/stage.type';
import { StageResultsService } from '../stage-results.service';

@Component({
  templateUrl: './stage-results.component.html',
  styleUrls: ['./stage-results.component.scss']
})
export class StageResultsComponent implements OnInit {

  projectId: string = '';

  testData = [
    {
      number: 1,
      title: 'Stage 1',
      description: 'Stage 1 description blah blah blah',
      actor: 'test actor',
      isConditional: false,
      priority: 'low',
      active: true,
    },
    {
      number: 2,
      title: 'Stage 2',
      description: 'Stage 2 description blah blah blah',
      actor: 'test actor 2',
      isConditional: false,
      priority: 'medium',
      active: false,
    },
    {
      number: 3,
      title: 'Stage 3',
      description: 'Stage 13description blah blah blah',
      actor: 'test actor',
      isConditional: false,
      priority: 'high',
      active: false,
    },
    {
      number: 4,
      title: 'Stage 4',
      description: 'Stage 4 description blah blah blah',
      actor: 'test actor',
      isConditional: false,
      priority: 'low',
      active: false,
    },
  ];

  // currentStageIndex: number = -1;

  currentStageResultIndex: number = -1;

  currentStage: Stage = {
    _id: '1',
    number: 5,
    title: 'Stage 5',
    description: 'Stage 5 description',
    actor: 'test actor',
    isConditional: false,
    priority: 'high'
  };

  projectFinished = false;

  stageResults: StageResult[] = [];

  currentStageForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private stageResultsService: StageResultsService,
  ) { }

  ngOnInit(): void {
    this.currentStageForm = this.fb.group({
      note: null,
    });
    this.route.params.subscribe((paramMap) => {
      this.projectId = paramMap.projectId;
      this.stageResultsService.getProjectStageResults(this.projectId).subscribe((stageResults: StageResult[]) => {
        if (!(stageResults.length === 0)) {
          this.stageResults = stageResults;
          this.currentStageResultIndex = this.stageResults.length - 1;
          if (this.stageResults.length === 0) {
            this.getNextStage(0);
          } else {
            this.getNextStage(this.stageResults[this.stageResults.length - 1].stage.number);
          }
        } else {
          this.projectFinished = true;
        }
      });
    })
  }

  goBack(): void {
    if (!(this.currentStageResultIndex === 0)) {
      this.currentStageResultIndex -= 1;
    }
  }

  goForward(): void {
    if (!(this.currentStageResultIndex === this.stageResults.length - 1)) {
      this.currentStageResultIndex += 1;
    }
  }

  goTo(stageResult: StageResult): void {
    const goToStageResultIndex = this.stageResults.indexOf(stageResult);
    if (goToStageResultIndex >= 0 && goToStageResultIndex < this.stageResults.length) {
      this.currentStageResultIndex = goToStageResultIndex;
    }
  }

  refreshStageResults(): void {
    this.stageResultsService.getProjectStageResults(this.projectId).subscribe((stageResults) => {
      this.stageResults = stageResults;
    });
  }

  getNextStage(currentStageIndex: number): void {
    this.stageResultsService.getNextStage(currentStageIndex).subscribe((nextStage) => {
      if (nextStage === null) {
        this.projectFinished = true;
      } else {
        this.currentStage = nextStage;
      }
    })
  }

  submitCurrentStage(): void {
    for (const i in this.currentStageForm.controls) {
      if (this.currentStageForm.controls.hasOwnProperty(i)) {
        this.currentStageForm.controls[i].markAsDirty();
        this.currentStageForm.controls[i].updateValueAndValidity();
      }
    }
    const stagePayload = {
      stage: this.currentStage._id,
      isDone: true,
      note: this.currentStageForm.value.note,
      project: this.projectId
    };
    this.stageResultsService.submitStage(stagePayload).subscribe(() => {
      this.refreshStageResults();
      this.getNextStage(this.currentStage.number);
    })
  }

}
