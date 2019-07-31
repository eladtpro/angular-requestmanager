import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Interceptor } from '../core/interceptor';
import { ConfigurationService } from '../services/configuration.service';
import { NotificationService } from '../services/notification.service';

export function configurationLoader(configService: ConfigurationService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    Interceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    ConfigurationService,
    NotificationService,
    {
      provide: APP_INITIALIZER,
      useFactory: configurationLoader,
      deps: [ConfigurationService],
      multi: true
    }
  ]
})
export class CoreModule {
  constructor() {
    console.log('LOADING MODULE: CoreModule');
  }
}
