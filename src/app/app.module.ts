import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './modules/header/header.module';
import { AppComponent } from './app.component';
import { CoreModule } from './shared/core/core.module';

// TODO: handle github security alerts:
// https://github.com/eladtpro/requestmanager-angular/network/alerts

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
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
