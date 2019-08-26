import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';

import { ConfigurationService } from '../services/configuration.service';
import { CredentialsInterceptor } from '../services/credentials.interceptor';
import { environment } from '../../../environments/environment.prod';
import { SpinnerInterceptor } from '../services/spinner.interceptor';

export function initConfiguration(config: ConfigurationService) {
  return() => config.resolve().toPromise();
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([], { enableTracing: environment.enableTracing })
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
        { provide: 'Window', useValue: window },
        { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor,     multi: true },
        { provide: APP_INITIALIZER,   useFactory: initConfiguration,    multi: true,  deps: [ConfigurationService] }
      ]
    };
  }
}
