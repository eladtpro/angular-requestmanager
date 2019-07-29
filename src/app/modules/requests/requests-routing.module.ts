import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RequestGridComponent } from './components/request-grid/request-grid.component';

const routes: Routes = [
  {path: '', component: RequestGridComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class RequestsRoutingModule { }
