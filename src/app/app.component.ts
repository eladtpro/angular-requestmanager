import { Component } from '@angular/core';
import { PreloadingStrategy } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'RequestManager';
}
