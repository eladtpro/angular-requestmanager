import { NgModule } from '@angular/core';

import { GroupByPipe } from './group-by.pipe';
import { MarkPipe } from './mark.pipe';
import { KeysPipe } from './keys.pipe';
import { MatchPipe } from './match.pipe';
import { TitleCamelCasePipe } from './title-camel-case.pipe';
import { LoginPipe } from './login.pipe';
import { DecodePipe } from './decode.pipe';
import { EnumSelectPipe } from './enum-select.pipe';
import { HtmlPipe } from './html.pipe';

@NgModule({
  declarations: [
    KeysPipe,
    GroupByPipe,
    MarkPipe,
    MatchPipe,
    TitleCamelCasePipe,
    LoginPipe,
    DecodePipe,
    EnumSelectPipe,
    HtmlPipe
  ],
  imports: [
  ],
  exports: [
    KeysPipe,
    GroupByPipe,
    MarkPipe,
    MatchPipe,
    TitleCamelCasePipe,
    LoginPipe,
    DecodePipe,
    EnumSelectPipe,
    HtmlPipe
  ]
})
export class PipesModule { }
