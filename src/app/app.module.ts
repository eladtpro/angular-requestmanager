import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './modules/header/header.module';
import { AppComponent } from './app.component';
import { ConfigurationService } from './shared/services/configuration.service';
import { AuthenticationService } from './shared/services/authentication.service';

export function initAuthentication(configService: ConfigurationService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.resolve();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule
  ],
  providers: [
    AuthenticationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAuthentication,
      deps: [ConfigurationService],
      multi: true
    }
  ],
   bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('LOADING MODULE: AppModule');
  }
}
