import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private _cartService: CartService) { }

  ngOnInit() {

    localStorage.removeItem('token');
    LoginService.sessionLoginId = null;
    this._cartService.clearMessages();
    this._cartService.clearPrice();
    this.router.navigate(['/home']);
    
  }

}
