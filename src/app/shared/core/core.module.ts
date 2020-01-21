import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';

import { entityConfig } from '../store/entity-metadata';
import { ConfigurationService } from '../services/configuration.service';
import { AuthenticationInterceptor } from '../services/authentication.interceptor';
import { environment } from '../../../environments/environment.prod';
import { SpinnerInterceptor } from '../modules/spinner/services/spinner.interceptor';

const RUNTIME_CHECKS = false;
export function initConfiguration(config: ConfigurationService) {
  if (!environment.enableTracing) {
    console.warn(`console.logging TERMINATED: environment.enableTracing=${environment.enableTracing}`);
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
    OAuthModule.forRoot(),
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: RUNTIME_CHECKS,
        strictActionImmutability: RUNTIME_CHECKS,
        strictStateSerializability: RUNTIME_CHECKS,
        strictActionSerializability: RUNTIME_CHECKS,
      }
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [
  ]
})
export class CoreModule {
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
