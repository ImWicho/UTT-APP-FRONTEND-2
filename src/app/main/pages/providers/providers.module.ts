import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { IndexProviderComponent } from './pages/index-provider/index-provider.component';
import { MaterialModule } from '@modules/material.module';


@NgModule({
  declarations: [
    IndexProviderComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    MaterialModule
  ]
})
export class ProvidersModule { }
