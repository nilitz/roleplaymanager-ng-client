import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecurityComponent} from './security/security.component';
import {HomeComponent} from './home/home.component';
import {BaseComponent} from './base/base.component';

const routes: Routes = [
  { path: 'auth', component: SecurityComponent},
  { path: '', component: BaseComponent},
  { path: 'roleplay/create', component: BaseComponent},
  { path: 'roleplay/join', component: BaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
