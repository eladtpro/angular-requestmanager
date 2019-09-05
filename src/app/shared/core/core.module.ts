import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';

import { ConfigurationService } from '../services/configuration.service';
import { AuthenticationInterceptor } from '../services/authentication.interceptor';
import { environment } from '../../../environments/environment.prod';
import { SpinnerInterceptor } from '../services/spinner.interceptor';

export function initConfiguration(config: ConfigurationService) {
  if (!environment.enableTracing) {
    console.warn(`console.log TERMINATED: environment.enableTracing=${environment.enableTracing}`);
    console.log = function (_message?: any, ..._optionalParams: any[]): void { /* do nothing */ };
  }
  return () => config.resolve(environment.configFile);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([], { enableTracing: environment.enableTracing }),
    OAuthModule.forRoot()
  ],
  providers: [
  ]
})
export class CoreModule {
  constructor() {
    console.log('LOADING MODULE: CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ConfigurationService,
        { provide: 'Window', useValue: window },
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor,    multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor,           multi: true },
        { provide: APP_INITIALIZER, useFactory: initConfiguration,            multi: true,  deps: [ConfigurationService] }
      ]
    };
  }
}
