import { HomepageComponent } from "./homepage/homepage.component";
import { ProductpageComponent } from './productpage/productpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'product/:id', component: ProductpageComponent },
  { path: '',  redirectTo: '/home',   pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];