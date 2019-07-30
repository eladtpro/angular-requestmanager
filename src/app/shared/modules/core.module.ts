import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { ConfigurationService } from '../services/configuration.service';
import { NotificationService } from '../services/notification.service';

export function ConfigurationLoader(configService: ConfigurationService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [],
  imports: [
    StoreModule
  ],
  providers: [
    NotificationService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigurationLoader,
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
