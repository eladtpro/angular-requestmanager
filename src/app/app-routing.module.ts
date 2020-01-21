import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { HelpComponent } from './modules/help/help.component';
import { ConfigurationResolver } from './shared/services/configuration.resolver';
import { HeaderComponent } from './modules/header/header.component';
import { Path } from './shared/model/path';
import { PathResolver } from './shared/services/path.resolver';
import { NotFoundComponent } from './modules/not-found/not-found.component';
// import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: Path.Home },
  { path: Path.Home, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: Path.Help, component: HelpComponent },
  {
    path: Path.Auth, // return_to URL https://openid.net/specs/openid-authentication-2_0.txt
    loadChildren: () => import('./modules/authentication/authentication.module').then(a => a.AuthenticationModule)
  },
  {
    path: Path.Requests,
    loadChildren: () => import('./modules/requests/requests.module').then(r => r.RequestsModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**', resolve: {
      path: PathResolver
    },
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
