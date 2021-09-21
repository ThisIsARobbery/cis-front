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

  optionsModalVisible = false;

  stageIsConditional = false;
  stageOptions: any = [];

  currentStageResultIndex: number = -1;

  currentStage: Stage = {
    number: -1,
    title: 'Все стадии заполнены',
    actor: '',
    isConditional: false,
    priority: 'high'
  };

  editingStageResult: StageResult | null = null;

  projectFinished = false;

  stageResults: StageResult[] = [];

  currentStageForm!: FormGroup;
  editingStageResultForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private stageResultsService: StageResultsService,
  ) { }

  ngOnInit(): void {
    this.currentStageForm = this.fb.group({
      note: null,
    });
    this.editingStageResultForm = this.fb.group({
      note: null,
    });
    this.route.params.subscribe((paramMap) => {
      this.projectId = paramMap.projectId;
      this.getNext();
    });
  }

  getNext(): void {
    this.stageResultsService.getProjectStageResults(this.projectId).subscribe((stageResults: StageResult[]) => {
      this.stageResults = stageResults;
      if (this.stageResults.length === 0) {
        this.getNextStage(0);
      } else {
        this.getNextStage(this.stageResults[this.stageResults.length - 1].stage.number);
      }
      this.currentStageResultIndex = this.stageResults.length - 1;
    });
  }

  goBack(): void {
    if (!(this.currentStageResultIndex === 0)) {
      this.currentStageResultIndex -= 1;
      this.editingStageResult = this.stageResults[this.currentStageResultIndex];
    }
  }

  goForward(): void {
    if (!(this.currentStageResultIndex > this.stageResults.length - 1)) {
      this.currentStageResultIndex += 1;
      this.editingStageResult = this.stageResults[this.currentStageResultIndex];
    } else {
      this.editingStageResult = null;
    }
  }

  goTo(stageResult: StageResult): void {
    const goToStageResultIndex = this.stageResults.indexOf(stageResult);
    if (goToStageResultIndex >= 0 && goToStageResultIndex < this.stageResults.length) {
      this.currentStageResultIndex = goToStageResultIndex;
      this.editingStageResult = stageResult;
      this.editingStageResultForm.setValue({
        note: stageResult.note
      });
      this.currentStage = stageResult.stage;
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
        if (this.currentStage.isConditional) {
          this.stageIsConditional = true;
          this.stageOptions = this.currentStage.options;
        }
      }
    })
  }

  getNextStageByRef(stageRef: string): void {
    this.stageResultsService.getStageById(stageRef).subscribe((nextStage) => {
      if (nextStage === null) {
        this.projectFinished = true;
      } else {
        this.currentStage = nextStage;
        if (this.currentStage.isConditional) {
          this.stageIsConditional = true;
          this.stageOptions = this.currentStage.options;
        }
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
    if (this.stageIsConditional) {
      this.openOptionsModal();
    } else {
      this.stageResultsService.submitStage(stagePayload).subscribe(() => {
        this.refreshStageResults();
        this.getNextStage(this.currentStage.number);
        this.cleanStageForm();
      })
    }
  }

  submitEditingForm(): void {
    if (this.editingStageResult) {
      for (const i in this.currentStageForm.controls) {
        if (this.editingStageResultForm.controls.hasOwnProperty(i)) {
          this.editingStageResultForm.controls[i].markAsDirty();
          this.editingStageResultForm.controls[i].updateValueAndValidity();
        }
      }
      const editingStageResultPayload = {
        note: this.editingStageResultForm.value.note
      };
      this.stageResultsService.updateStageResult(<string>this.editingStageResult._id, editingStageResultPayload).subscribe(() => {
        this.editingStageResult = null;
        this.refreshStageResults();
        this.editingStageResultForm.reset();
        this.getNext();
      });
    }
  }

  cleanStageForm(): void {
    this.currentStageForm.reset();
  }

  openOptionsModal(): void {
    this.optionsModalVisible = true;
  }

  cancelOptionsModal(): void {
    this.optionsModalVisible = false;
  }

  submitOptionsModal(stageRef: string): void {
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
      this.stageIsConditional = false;
      this.stageOptions = [];
      this.refreshStageResults();
      this.getNextStageByRef(stageRef);
      this.cleanStageForm();
      this.cancelOptionsModal();
    })
  }
}
