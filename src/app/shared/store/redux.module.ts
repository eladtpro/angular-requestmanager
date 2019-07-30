import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EntityDataModule } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { entityConfig } from './entity-metadata';
import { environment } from '../../../environments/environment';

@NgModule({
    imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        environment.production ? [] : StoreDevtoolsModule.instrument(),
        EntityDataModule.forRoot(entityConfig)
    ]
})

export class ReduxModule {
  constructor() {
    console.log('LOADING MODULE: ReduxModule');
  }
}
