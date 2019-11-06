import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from './login';
import { Login } from './login.model';
import { LoginService } from './login.service';

import { interval } from 'rxjs';
import { map} from 'rxjs/operators';
 
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginDetails: ILogin[];
  errorMsg: String;
  login = new Array<Login>();
  
  constructor(private router: Router, private _loginService: LoginService) { 
    
    this._loginService.getLoginDetails().subscribe( response =>
      {
       // console.log('response', response);
      this.login = response['login'].map(item =>
        {
          return new Login(
            item.username,
            item.password
          );}
        );}
    );
  }

  ngOnInit() {
    this.loginForm = new FormGroup ({
      username: new FormControl(),
      password:  new FormControl()
    });  

   // this.loginDetails = this._loginService.getLoginDetails();
  }

  onSubmit(): void {
    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;
    
   /* for(let i=0;i<this.loginDetails.length;i++){
      let user = this.loginDetails[i].username;
      let pass = this.loginDetails[i].password;

      if(username == user && password == pass){
        this.router.navigate(['/homepage']);  
      }
    }*/

    for(let i=0; i<this.login.length;i++){
      let user = this.login[i].username;
      let pass = this.login[i].password;
      console.log("user:"+user+ "pass:"+pass);
      
      if(username == user && password == pass){
        this.router.navigate(['/homepage']);  
      }
    }
    this.errorMsg = "Invalid Username/Password!!!";
    return;
    
  }

  


  
}
