import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './modules/header/header.module';
import { AppComponent } from './app.component';
import { CoreModule } from './shared/core/core.module';
import { HelpComponent } from './modules/help/help.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { PipesModule } from './shared/pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    HeaderModule,
    PipesModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
