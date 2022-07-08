import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    MainComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BookModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
