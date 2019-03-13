import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsModule } from './modules/requests/requests.module';
import { AppPreloader } from './app-preloader';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'requests', loadChildren: './modules/requests/requests.module#RequestsModule'},
  {path: '**', redirectTo: 'home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: AppPreloader}), RequestsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
