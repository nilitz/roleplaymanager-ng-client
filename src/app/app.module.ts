import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityComponent } from './security/security.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CreateRoleplayDialogComponent, NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { LoginRequiredInterceptor } from './login-required.interceptor';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { RoleplayDetailComponent} from './roleplay-detail/roleplay-detail.component';
import { RoleplayComponent } from './roleplay/roleplay.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { AnonymousLayoutComponent } from './anonymous-layout/anonymous-layout.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {CreateItemDialogComponent, RoleplayItemsComponent} from './roleplay-items/roleplay-items.component';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
    NavComponent,
    HomeComponent,
    RoleplayDetailComponent,
    RoleplayComponent,
    AuthenticatedLayoutComponent,
    AnonymousLayoutComponent,
    CreateRoleplayDialogComponent,
    RoleplayItemsComponent,
    CreateItemDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,
    MatChipsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatGridListModule,
    AutoSizeInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginRequiredInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
