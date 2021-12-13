import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedComponentsModule } from '@components/shared-components.module';
import { MaterialModule } from '@modules/material.module';

import { MainComponent } from './pages/main/main.component';
import { StoreModule } from '@ngrx/store';
import { userReducerReducer } from './store/userStore/reducers';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    SharedComponentsModule,
    StoreModule.forFeature('user', userReducerReducer)
  ]
})
export class MainModule { }
