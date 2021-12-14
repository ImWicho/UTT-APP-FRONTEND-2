import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestIndexComponent } from './pages/request-index/request-index.component';

const routes: Routes = [
  { path: '', component: RequestIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
