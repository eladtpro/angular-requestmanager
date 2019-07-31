import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RequestGridComponent } from './components/request-grid/request-grid.component';
import { CoreModule } from '../../shared/modules/core.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { RequestService } from './services/request.service';
import { ReduxModule } from '../../shared/store/redux.module';

const routes: Routes = [
  {path: '', component: RequestGridComponent }
];

@NgModule({
  declarations: [
    RequestGridComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    ReduxModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    RequestService
  ]
})
export class RequestsModule {
  constructor() {
    console.log('LOADING MODULE: RequestsModule');
  }
}
