import { Component, OnInit } from '@angular/core';
import Globals from '../../../core/globals';

@Component({
  selector: 'ms-trade-mark',
  template: `{{ htmlTitle | html }}`,
  styles: []
})
export class TradeMarkComponent {
  htmlTitle = Globals.HtmlTitle;
}
