import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './book/pagination/pagination.component';
import { ContentComponent } from './book/content/content.component';
import { FirstPageComponent } from './book/pages/first-page/first-page.component';
import { SecondPageComponent } from './book/pages/second-page/second-page.component';
import { ThirdPageComponent } from './book/pages/third-page/third-page.component';
import { FourthPageComponent } from './book/pages/fourth-page/fourth-page.component';
import { FifthPageComponent } from './book/pages/fifth-page/fifth-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    HeaderComponent,
    ContentComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    FourthPageComponent,
    FifthPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
