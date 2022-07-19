import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './book-page/book-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as bookRoutes } from './book/book-routing.module';
import { TabelPageComponent } from './tabel-page/tabel-page.component';
import { AuthComponent } from './auth/auth.component';
import { ChartsComponent } from './carts/charts.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'signup',
    component: AuthComponent,
  },
  {
    path: 'book',
    children: bookRoutes,
    component: BookPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'table',
    component: TabelPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'charts',
    component: ChartsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
