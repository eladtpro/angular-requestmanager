import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { RequestGridComponent } from './components/request-grid/request-grid.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ReduxModule } from '../../shared/store/redux.module';
import { ConfigurationResolver } from '../../shared/core/configuration-resolver';
import { RequestComponent } from './components/request/request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../shared/modules/pipes.module';
import { DialogsModule } from '../dialogs/dialogs.module';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ExternalContentComponent } from './components/external-content/external-content.component';

const routes: Routes = [
  { path: '', component: RequestGridComponent },
  { path: 'new-request', component: RequestComponent },
  { path: 'docs/:type', component: DocumentationComponent }
];

@NgModule({
  declarations: [
    RequestGridComponent,
    RequestComponent,
    DocumentationComponent,
    ExternalContentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ReduxModule,
    PipesModule,
    DialogsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  entryComponents:[
    ExternalContentComponent
  ]
})
export class RequestsModule {
  constructor(private injector: Injector) {
    console.log('LOADING MODULE: RequestsModule');
  }

  ngDoBootstrap() {
    const tileCE = createCustomElement(ExternalContentComponent, { injector: this.injector });

  }
}
