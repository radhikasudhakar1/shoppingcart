import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginGuard } from './login.guard';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';


const routes: Routes = [
  { path: 'head', component: HeaderComponent },
  { path: 'vieworder/:orderid', component: OrderComponent, canActivate: [LoginGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [LoginGuard]},
  { path: 'viewcart', component: CartComponent, canActivate: [LoginGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [LoginGuard]},
  { path: 'logout', component: LogoutComponent},
  { path: 'category/:catid', component: CategoryComponent, data :{reuseRoute: false}},//, canActivate: [AuthGuard] },
  { path: 'product/:productid', component: ProductpageComponent, data :{reuseRoute: false}},
  { path: 'createaccount', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent },
  { path: '',  redirectTo: '/home',   pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
