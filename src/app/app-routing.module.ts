import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FifthPageComponent } from './book/pages/fifth-page/fifth-page.component';
import { FirstPageComponent } from './book/pages/first-page/first-page.component';
import { FourthPageComponent } from './book/pages/fourth-page/fourth-page.component';
import { SecondPageComponent } from './book/pages/second-page/second-page.component';
import { ThirdPageComponent } from './book/pages/third-page/third-page.component';

const routes: Routes = [
  { path: '', redirectTo: '1', pathMatch: 'full' },
  { path: '1', component: FirstPageComponent },
  { path: '2', component: SecondPageComponent },
  { path: '3', component: ThirdPageComponent },
  { path: '4', component: FourthPageComponent },
  { path: '5', component: FifthPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
