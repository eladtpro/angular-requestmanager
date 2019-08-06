import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RequestGridComponent } from './components/request-grid/request-grid.component';
import { CoreModule } from '../../shared/modules/core.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { RequestService } from './services/request.service';
import { ReduxModule } from '../../shared/store/redux.module';
import { ConfigurationResolver } from '../../shared/core/configuration-resolver';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { RequestComponent } from './components/request/request.component';
import { ReactiveFormsModule } from '@angular/forms';

export function initRequests(configService: ConfigurationService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.resolve();
}

const routes: Routes = [
  {path: '', component: RequestGridComponent, resolve: { resolver: ConfigurationResolver } },
  {path: 'new-request', component: RequestComponent }
];

@NgModule({
  declarations: [
    RequestGridComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialModule,
    ReduxModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ConfigurationResolver,
    RequestService,
    {
      provide: APP_INITIALIZER,
      useFactory: initRequests,
      deps: [ConfigurationService],
      multi: true
    }

  ]
})
export class RequestsModule {
  constructor() {
    console.log('LOADING MODULE: RequestsModule');
  }
}
