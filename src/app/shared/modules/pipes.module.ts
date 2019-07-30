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
  ],
  exports: [
    KeysPipe,
    GroupByPipe,
    MarkPipe,
    MatchPipe
  ]
})
export class PipesModule {
  constructor() {
    console.log('LOADING MODULE: PipesModule');
  }
}
