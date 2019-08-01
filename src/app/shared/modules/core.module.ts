import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Interceptor } from '../core/interceptor';
import { ConfigurationService } from '../services/configuration.service';
import { NotificationService } from '../services/notification.service';
import { ConfigurationResolver } from '../core/configuration-resolver';

export function initNotifications(configService: ConfigurationService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.resolve();
}

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    Interceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    ConfigurationResolver,
    ConfigurationService,
    NotificationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initNotifications,
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
