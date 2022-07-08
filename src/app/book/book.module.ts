import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { SecondPageComponent } from './pages/second-page/second-page.component';
import { ThirdPageComponent } from './pages/third-page/third-page.component';
import { FourthPageComponent } from './pages/fourth-page/fourth-page.component';
import { FifthPageComponent } from './pages/fifth-page/fifth-page.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BookRoutingModule } from './book-routing.module';



@NgModule({
  declarations: [
    ContentComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    FourthPageComponent,
    FifthPageComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
  ],
  exports: [
    ContentComponent,
    PaginationComponent
  ]
})
export class BookModule { }
