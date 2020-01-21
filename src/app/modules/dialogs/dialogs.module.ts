import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { ConfirmationComponent } from './confirmation.component';
import { MaterialModule } from '../../shared/modules/material/material.module';

@NgModule({
  declarations: [
    AlertComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    ConfirmationComponent
  ]
})
export class DialogsModule { }
