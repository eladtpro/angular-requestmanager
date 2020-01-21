import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../../pipes/pipes.module';
import { TradeMarkComponent } from './components/trade-mark.component';

@NgModule({
  declarations: [
    TradeMarkComponent,
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    TradeMarkComponent
  ],
})
export class TradeMarkModule { }
