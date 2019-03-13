import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RequestGridComponent } from './components/request-grid/request-grid.component';
import { RequestsResolverService } from './services/requests-resolver.service';

const routes: Routes = [
  {path: '', component: RequestGridComponent, resolve: RequestsResolverService }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class RequestsRoutingModule { }
