import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../../shared/modules/material.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SignupComponent } from './signup/signup.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { PipesModule } from '../../shared/pipes/pipes.module';


const routes: Routes = [
  { path: '', component: AuthCallbackComponent },
  { path: 'login', component: SignupComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  declarations: [
    UserDetailsComponent,
    SignupComponent,
    AuthCallbackComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PipesModule
  ],
  exports: [
  ],
  entryComponents: [
    UserDetailsComponent
  ]
})
export class AuthenticationModule { }
