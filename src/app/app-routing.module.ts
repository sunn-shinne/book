import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './book-page/book-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as bookRoutes } from './book/book-routing.module';
import { TabelPageComponent } from './tabel-page/tabel-page.component';
import { AuthComponent } from './auth/auth.component';
import { ChartsComponent } from './charts/charts.component';
import { AuthGuard } from './auth.guard';
import { AccessRightGuard } from './right.guard';

const routes: Routes = [
  { path: '', redirectTo: '/book/1', pathMatch: 'full' },
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
    canActivate: [AuthGuard, AccessRightGuard],
    data: { 'access-token': '2591-1589-6307-7588' },
  },
  {
    path: 'table',
    component: TabelPageComponent,
    canActivate: [AuthGuard, AccessRightGuard],
    data: { 'access-token': '5525-5681-6140-8266' },
  },
  {
    path: 'charts',
    component: ChartsComponent,
    canActivate: [AuthGuard, AccessRightGuard],
    data: { 'access-token': '2720-4044-4713-0021' },
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
