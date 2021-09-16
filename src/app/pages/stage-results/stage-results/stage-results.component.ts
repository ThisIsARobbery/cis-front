import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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

  currentStage = {
    number: 5,
    title: 'Stage 5',
    description: 'Stage 5 description',
    actor: 'test actor',
    isConditional: false,
    priority: 'high'
  };

  stageResults: [] = [];

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
      this.getStageResults();
      if (this.stageResults.length === 0) {
        this.getNextStage(0);
      }
    })
  }

  getStageResults(): void {
    this.stageResultsService.getProjectStageResults(this.projectId).subscribe((stageResults) => {
      this.stageResults = stageResults;
    });
  }

  getNextStage(currentStageIndex: number): void {
    this.stageResultsService.getNextStage(currentStageIndex).subscribe((nextStage) => {
      this.currentStage = nextStage;
    })
  }

  submitCurrentStage(): void {
    for (const i in this.currentStageForm.controls) {
      if (this.currentStageForm.controls.hasOwnProperty(i)) {
        this.currentStageForm.controls[i].markAsDirty();
        this.currentStageForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
