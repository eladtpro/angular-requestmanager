import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatDialogModule,
  MatGridListModule
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core.module';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    // NoopAnimationsModule,
    // BrowserAnimationsModule, // ERROR Error: Uncaught (in promise): Error: BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.
    CoreModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {
  constructor() {
    console.log('LOADING MODULE: MaterialModule');
  }
}
