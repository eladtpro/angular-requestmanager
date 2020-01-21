import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../../shared/modules/material/material.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SignupComponent } from './signup/signup.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { TradeMarkModule } from 'src/app/shared/modules/trade-mark/trade-mark.module';


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
    PipesModule,
    TradeMarkModule
  ],
  exports: [
  ],
  entryComponents: [
    UserDetailsComponent
  ]
})
export class AuthenticationModule { }
