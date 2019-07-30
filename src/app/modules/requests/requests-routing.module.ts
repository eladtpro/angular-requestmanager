import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestGridComponent } from './components/request-grid/request-grid.component';

export const routes: Routes = [
  {path: '', component: RequestGridComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class RequestsRoutingModule {
  constructor() {
    console.log('LOADING MODULE: RequestsRoutingModule');
  }
 }
