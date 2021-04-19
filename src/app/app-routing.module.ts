import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecurityComponent} from './security/security.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: 'auth', component: SecurityComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
