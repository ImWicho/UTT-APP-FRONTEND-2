import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { IndexOrdersComponent } from './pages/index-orders/index-orders.component';
import { MaterialModule } from '@modules/material.module';
import { ProvidersDialogComponent } from './components/providers-dialog/providers-dialog.component';


@NgModule({
  declarations: [
    IndexOrdersComponent,
    ProvidersDialogComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule
  ]
})
export class OrdersModule { }
