import { CoreModule } from './shared/modules/core.module';
import { AppPreloader } from './app-preloader';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { MaterialModule } from './shared/modules/material.module';
import { PipesModule } from './shared/modules/pipes.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './shared/core/interceptor';
import { HomeComponent } from './modules/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    PipesModule
  ],
  providers: [
    AppPreloader,
    Interceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
