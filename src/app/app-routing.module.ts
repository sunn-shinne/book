import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './book-page/book-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as bookRoutes } from './book/book-routing.module';
import { TabelPageComponent } from './tabel-page/tabel-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/book/1', pathMatch: 'full' },
  {
    path: 'book',
    children: bookRoutes,
    component: BookPageComponent,
  },
  {
    path: 'table',
    component: TabelPageComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
