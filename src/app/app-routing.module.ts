import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecurityComponent} from './security/security.component';
import {HomeComponent} from './home/home.component';
import {RoleplayDetailComponent} from './roleplay-detail/roleplay-detail.component';
import {RoleplayComponent} from './roleplay/roleplay.component';
import {AnonymousLayoutComponent} from './anonymous-layout/anonymous-layout.component';
import {AuthenticatedLayoutComponent} from './authenticated-layout/authenticated-layout.component';

const routes: Routes = [

  { path: '', component: AuthenticatedLayoutComponent, canActivate : [  ], children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'roleplay', children: [
          { path: ':id', component: RoleplayComponent}
        ]
      },
    ]
  },
  { path: '', component: AnonymousLayoutComponent, children: [
      { path: 'auth', component: SecurityComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
