import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { HelpComponent } from './modules/help/help.component';
import { ConfigurationResolver } from './shared/services/configuration.resolver';
import { HeaderComponent } from './modules/header/header.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HeaderComponent, resolve: { resolver: ConfigurationResolver },
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth', // return_to URL https://openid.net/specs/openid-authentication-2_0.txt
    loadChildren: () => import('./modules/authentication/authentication.module').then(a => a.AuthenticationModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./modules/requests/requests.module').then(r => r.RequestsModule),
    canActivate: [AuthenticationGuard]
  },
  { path: 'help', component: HelpComponent },
  { path: '404', redirectTo: '/404' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
