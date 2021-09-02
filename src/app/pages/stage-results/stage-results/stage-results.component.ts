import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './stage-results.component.html',
  styleUrls: ['./stage-results.component.scss']
})
export class StageResultsComponent implements OnInit {

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

  currentStageForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentStageForm = this.fb.group({
      note: null,
    });
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
