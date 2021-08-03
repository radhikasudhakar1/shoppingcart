import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AccountComponent } from './account/account.component';
import { CategoryComponent } from './category/category.component';

import { TokenInterceptorServiceService } from './token-interceptor-service.service';
import { LoginService } from './login/login.service';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { RouterLinkRendererComponent } from './order/RouterLinkRendererComponent';

import { SearchByName } from './common/searchByName.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomReuseStrategy } from './common/costuReuseStrategy';

@NgModule({
  declarations: [
    RouterLinkRendererComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomepageComponent,
    ProductpageComponent,
    PagenotfoundComponent,
    AccountComponent,
    CategoryComponent,
    LogoutComponent,
    CartComponent,
    PaymentComponent,
    OrderComponent,
    SearchByName
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    AgGridModule.withComponents(null)
  ],
  entryComponents: [RouterLinkRendererComponent],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorServiceService, multi: true}, 
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
  LoginService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}
