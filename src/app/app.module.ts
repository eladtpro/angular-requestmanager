import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './modules/header/header.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule
  ],
  providers: [
  ],
   bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('LOADING MODULE: AppModule');
  }
}
