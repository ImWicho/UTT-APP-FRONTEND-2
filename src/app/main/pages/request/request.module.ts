import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestIndexComponent } from './pages/request-index/request-index.component';
import { MaterialModule } from '@modules/material.module';
import { RequestDialogComponent } from './components/request-dialog/request-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequestIndexComponent,
    RequestDialogComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RequestModule { }
