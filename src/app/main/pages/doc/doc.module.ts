import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { DocIndexComponent } from './pages/doc-index/doc-index.component';
import { MaterialModule } from '@modules/material.module';


@NgModule({
  declarations: [
    DocIndexComponent
  ],
  imports: [
    CommonModule,
    DocRoutingModule,
    MaterialModule
  ]
})
export class DocModule { }
