import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CartComponent } from './cart/cart.component';


import { ReactiveFormsModule } from '@angular/forms';

const appUrls: Routes = [
  { path: 'homepage' , component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component:AppComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appUrls)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
