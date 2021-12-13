import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { IndexResultsComponent } from './pages/index-results/index-results.component';
import { MaterialModule } from '@modules/material.module';


@NgModule({
  declarations: [
    IndexResultsComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    MaterialModule
  ]
})
export class ResultsModule { }
