import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { CartService } from './cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';
  loginid = LoginService.sessionLoginId;

  constructor(private _loginService: LoginService, private _cartService: CartService){

    
  }

  getLoggedinstatus(){
    if(this._loginService.getLoginId() == null || this._loginService.getLoginId() == undefined){
      return false;
    }else{
      return true;
    }
   // return this._loginService.loggedIn();
  }

  
  getCurrentTime(){
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  ngOnInit() {
   
  }
}
