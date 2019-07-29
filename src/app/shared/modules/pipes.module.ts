// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupByPipe } from '../pipes/group-by.pipe';
import { MarkPipe } from '../pipes/mark.pipe';
import { KeysPipe } from '../pipes/keys.pipe';
import { MatchPipe } from '../pipes/match.pipe';

@NgModule({
  declarations: [
    KeysPipe,
    GroupByPipe,
    MarkPipe,
    MatchPipe,
  ],
  imports: [
    // CommonModule
  ],
  exports: [
    KeysPipe,
    GroupByPipe,
    MarkPipe,
    MatchPipe
  ]
})
export class PipesModule {

}
