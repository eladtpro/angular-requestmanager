import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { HelpComponent } from './modules/help/help.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(a => a.AuthenticationModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./modules/requests/requests.module').then(r => r.RequestsModule),
    canActivate: [AuthenticationGuard]
  },
  { path: 'help', component: HelpComponent },
  { path: '404', redirectTo: '/home/404' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
