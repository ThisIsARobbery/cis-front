import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { StageResultsRoutingModule } from './stage-results-routing.module';
import { StageResultsComponent } from './stage-results/stage-results.component';


@NgModule({
  declarations: [
    StageResultsComponent
  ],
  imports: [
    CommonModule,
    StageResultsRoutingModule,
    NzBreadCrumbModule
  ]
})
export class StageResultsModule { }
