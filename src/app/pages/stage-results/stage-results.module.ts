import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

import { StageResultsRoutingModule } from './stage-results-routing.module';
import { StageResultsComponent } from './stage-results/stage-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [
    StageResultsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StageResultsRoutingModule,
    NzBreadCrumbModule,
    NzCollapseModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule
  ]
})
export class StageResultsModule { }
