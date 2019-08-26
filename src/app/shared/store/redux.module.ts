import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import {map } from 'rxjs/operators';

import { entityConfig } from './entity-metadata';
import { environment } from '../../../environments/environment';
import { DataServiceConfig } from './data-service-configuration';
import { ConfigurationService } from '../services/configuration.service';

const RUNTIME_CHECKS = false;

@NgModule({
    imports: [
        StoreModule.forRoot({}, {runtimeChecks: {
          strictStateImmutability: RUNTIME_CHECKS,
          strictActionImmutability: RUNTIME_CHECKS,
          strictStateSerializability: RUNTIME_CHECKS,
          strictActionSerializability: RUNTIME_CHECKS,
        }}),
        EffectsModule.forRoot([]),
        environment.production ? [] : StoreDevtoolsModule.instrument(),
        EntityDataModule.forRoot(entityConfig)
    ],
    providers: [
      {
        provide: DefaultDataServiceConfig,
        useClass: DataServiceConfig,
        deps: [ConfigurationService]
      }
    ]
})

export class ReduxModule {
  constructor() {
    console.log('LOADING MODULE: ReduxModule');
  }
}
