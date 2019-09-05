import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './modules/header/header.module';
import { AppComponent } from './app.component';
import { CoreModule } from './shared/core/core.module';
import { HelpComponent } from './modules/help/help.component';

// TODO: handle github security alerts:
// https://github.com/eladtpro/requestmanager-angular/network/alerts

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
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
export class AppModule { }
