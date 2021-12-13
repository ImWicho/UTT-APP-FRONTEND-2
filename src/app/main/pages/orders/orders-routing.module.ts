import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexOrdersComponent } from './pages/index-orders/index-orders.component';

const routes: Routes = [
  { path: '', component: IndexOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
