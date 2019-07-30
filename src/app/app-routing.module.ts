import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPreloader } from './app-preloader';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'requests',
    loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule)
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloader })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
