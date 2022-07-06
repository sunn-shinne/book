import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FifthPageComponent } from './pages/fifth-page/fifth-page.component';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { FourthPageComponent } from './pages/fourth-page/fourth-page.component';
import { SecondPageComponent } from './pages/second-page/second-page.component';
import { ThirdPageComponent } from './pages/third-page/third-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/page/1', pathMatch: 'full' },
  { path: 'page/1', component: FirstPageComponent },
  { path: 'page/2', component: SecondPageComponent },
  { path: 'page/3', component: ThirdPageComponent },
  { path: 'page/4', component: FourthPageComponent },
  { path: 'page/5', component: FifthPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
