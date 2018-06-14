import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import {
  MatMenuModule, MatButtonModule, MatIconModule, MatCardModule,
  MatTableModule, MatPaginatorModule, MatSortModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BookComponent } from './book/book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './menu/about/about.component';
import { SalonsComponent } from './menu/salons/salons.component';
import { ServicesComponent } from './menu/services/services.component';
import { HomeComponent } from './home/home.component';
import { DataTableComponent } from './menu/services/data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BookComponent,
    PageNotFoundComponent,
    AboutComponent,
    SalonsComponent,
    ServicesComponent,
    HomeComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'app-menu',
        component: MenuComponent,
        children: [
          {
            path: 'app-salons', component: SalonsComponent
          },
          {
            path: 'app-about', component: AboutComponent
          },
          {
            path: 'app-services', component: ServicesComponent,
            children: [
              {
                path: 'data-table',
                component: DataTableComponent
              }
            ]
          }
        ]
      },
      {
        path: 'app-book',
        component: BookComponent
      },
      { path: '**', component: PageNotFoundComponent }
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
