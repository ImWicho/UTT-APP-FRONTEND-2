import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { DocIndexComponent } from './pages/doc-index/doc-index.component';
import { MaterialModule } from '@modules/material.module';
import { DocDialogComponent } from './components/doc-dialog/doc-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DocIndexComponent,
    DocDialogComponent
  ],
  imports: [
    CommonModule,
    DocRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DocModule { }
