import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RequestGridComponent } from './components/request-grid/request-grid.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ReduxModule } from '../../shared/store/redux.module';
import { ConfigurationResolver } from '../../shared/core/configuration-resolver';
import { RequestComponent } from './components/request/request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../shared/modules/pipes.module';
import { DialogsModule } from '../dialogs/dialogs.module';

const routes: Routes = [
  {path: '', component: RequestGridComponent },
  {path: 'new-request', component: RequestComponent }
];

@NgModule({
  declarations: [
    RequestGridComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ReduxModule,
    PipesModule,
    DialogsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})
export class RequestsModule {
  constructor() {
    console.log('LOADING MODULE: RequestsModule');
  }
}
