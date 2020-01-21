import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { DataServiceConfig } from './data-service-configuration';
import { ConfigurationService } from '../services/configuration.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';


@NgModule({
    imports: [
    StoreModule.forFeature('ReduxModule', {}),
    EffectsModule.forFeature([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    ],
    providers: [
      {
        provide: DefaultDataServiceConfig,
        useClass: DataServiceConfig,
        deps: [ConfigurationService]
      }
    ]
})

export class ReduxModule { }
