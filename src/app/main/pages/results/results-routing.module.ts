import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexResultsComponent } from './pages/index-results/index-results.component';

const routes: Routes = [
  { path: '', component: IndexResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
