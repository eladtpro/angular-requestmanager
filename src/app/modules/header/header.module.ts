import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../shared/modules/material.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
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
