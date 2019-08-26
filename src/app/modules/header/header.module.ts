import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { SpinnerComponent } from './spinner.component';
import { ReduxModule } from '../../shared/store/redux.module';
import { LoginComponent } from './login/login.component';
import { PipesModule } from '../../shared/modules/pipes.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReduxModule,
    PipesModule
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class HeaderModule {
  constructor() {
    console.log('LOADING MODULE: HomeModule');
  }
}
