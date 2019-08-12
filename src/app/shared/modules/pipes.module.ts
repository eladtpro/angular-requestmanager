import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GroupByPipe } from '../pipes/group-by.pipe';
import { MarkPipe } from '../pipes/mark.pipe';
import { KeysPipe } from '../pipes/keys.pipe';
import { MatchPipe } from '../pipes/match.pipe';
import { TitleCamelCasePipe } from '../pipes/title-camel-case.pipe';

@NgModule({
  declarations: [
    KeysPipe,
    GroupByPipe,
    MarkPipe,
    MatchPipe,
    TitleCamelCasePipe
  ],
  imports: [
  ],
  exports: [
    KeysPipe,
    GroupByPipe,
    MarkPipe,
    MatchPipe,
    TitleCamelCasePipe
  ]
})
export class PipesModule {
  constructor() {
    console.log('LOADING MODULE: PipesModule');
  }
}
