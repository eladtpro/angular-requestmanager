import { NgModule } from '@angular/core';
import { GroupByPipe } from '../pipes/group-by.pipe';
import { MarkPipe } from '../pipes/mark.pipe';
import { KeysPipe } from '../pipes/keys.pipe';
import { MatchPipe } from '../pipes/match.pipe';
import { TitleCamelCasePipe } from '../pipes/title-camel-case.pipe';
import { LoginPipe } from '../pipes/login.pipe';


@NgModule({
  declarations: [
    KeysPipe,
    GroupByPipe,
    MarkPipe,
    MatchPipe,
    TitleCamelCasePipe,
    LoginPipe
  ],
  imports: [
  ],
  exports: [
    KeysPipe,
    GroupByPipe,
    MarkPipe,
    MatchPipe,
    TitleCamelCasePipe,
    LoginPipe
  ]
})
export class PipesModule {
  constructor() {
    console.log('LOADING MODULE: PipesModule');
  }
}
