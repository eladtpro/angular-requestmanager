import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestGridComponent } from './components/request-grid/request-grid.component';
// import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RequestsRoutingModule } from './requests-routing.module';

export const config = {
  apiKey: 'AIzaSyC6oG1B9XjXlQpBdRphfewPU7QP2PTxasg',
  authDomain: 'requesthub-748cc.firebaseapp.com',
  databaseURL: 'https://requesthub-748cc.firebaseio.com',
  projectId: 'requesthub-748cc',
  storageBucket: 'requesthub-748cc.appspot.com',
  messagingSenderId: '772813675652'
};

@NgModule({
  declarations: [
    RequestGridComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    // AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    RequestsRoutingModule
  ],
  providers: []
})
export class RequestsModule { }
