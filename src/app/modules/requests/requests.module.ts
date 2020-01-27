import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { RequestGridComponent } from './components/request-grid/request-grid.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { ReduxModule } from '../../shared/store/redux.module';
import { RequestComponent } from './components/request/request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { DialogsModule } from '../dialogs/dialogs.module';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ExternalContentComponent } from './components/external-content/external-content.component';
import { NpmService } from './services/npm.service';
import { SpinnerModule } from 'src/app/shared/modules/spinner/spinner.module';
import { Path } from 'src/app/shared/model/path';

const routes: Routes = [
  { path: '', component: RequestGridComponent },
  { path: Path.NewRequest, component: RequestComponent },
  { path: `${Path.Docs}/:type`, component: DocumentationComponent },
  { path: Path.Docs, component: DocumentationComponent }
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
    SpinnerModule,
    ScrollingModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    NpmService,
  ],
  entryComponents: [
    ExternalContentComponent
  ]
})
export class RequestsModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const tileCE = createCustomElement(ExternalContentComponent, { injector: this.injector });
  }
}
