import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {



  constructor(private router: Router){

  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      
      const loginid = LoginService.sessionLoginId;

    if (loginid === null || loginid === undefined) {
      this.router.navigate(['/login'],{queryParams:{'redirectURL': state.url}});
      //this.errorMsg = "Please login to view your cart";
      return false;
    } else {
      return true;
    }
  }
  
}
