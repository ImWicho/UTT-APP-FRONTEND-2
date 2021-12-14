import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocIndexComponent } from './pages/doc-index/doc-index.component';

const routes: Routes = [
  { path: '', component: DocIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocRoutingModule { }
