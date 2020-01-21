import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { TradeMarkModule } from 'src/app/shared/modules/trade-mark/trade-mark.module';

const routes: Routes = [
  {path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    TradeMarkModule
  ]
})
export class HomeModule { }
