import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { ReduxModule } from '../../shared/store/redux.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SpinnerModule } from '../../shared/modules/spinner/spinner.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReduxModule,
    PipesModule,
    AuthenticationModule,
    SpinnerModule,
  ],
  exports: [
    HeaderComponent
  ],
})
export class HeaderModule { }
