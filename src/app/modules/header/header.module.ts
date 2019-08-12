import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { CoreModule } from '../../shared/modules/core.module';
import { SpinnerComponent } from './spinner.component';
import { ReduxModule } from '../../shared/store/redux.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MaterialModule,
    ReduxModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
  constructor() {
    console.log('LOADING MODULE: HomeModule');
  }
}
