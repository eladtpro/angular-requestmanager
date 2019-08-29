import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { SpinnerComponent } from './spinner.component';
import { ReduxModule } from '../../shared/store/redux.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { AuthenticationModule } from '../authentication/authentication.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReduxModule,
    PipesModule,
    AuthenticationModule
  ],
  exports: [
    HeaderComponent
  ],
})
export class HeaderModule {
  constructor() {
    console.log('LOADING MODULE: HomeModule');
  }
}
