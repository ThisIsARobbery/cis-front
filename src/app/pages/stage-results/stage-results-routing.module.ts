import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StageResultsComponent } from './stage-results/stage-results.component';

const routes: Routes = [
  { path: 'process', component: StageResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StageResultsRoutingModule { }
