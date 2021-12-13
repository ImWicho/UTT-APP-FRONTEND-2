import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexQuizesComponent } from './pages/index-quizes/index-quizes.component';

const routes: Routes = [
  { path: '', component: IndexQuizesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizesRoutingModule { }
