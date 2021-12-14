import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestIndexComponent } from './pages/request-index/request-index.component';
import { MaterialModule } from '@modules/material.module';


@NgModule({
  declarations: [
    RequestIndexComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    MaterialModule
  ]
})
export class RequestModule { }
