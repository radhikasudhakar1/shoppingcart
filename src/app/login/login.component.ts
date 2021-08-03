import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { ILogin } from './login';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { Auth } from './auth.model';
import { CartService } from '../cart/cart.service';


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
  login = new Login();
  redirectURL: any;
  submitted = false;

  constructor(private router: Router, private _loginService: LoginService,
    private route: ActivatedRoute, private _cartService: CartService, private formbuilder: FormBuilder) { 
      let params = this.route.snapshot.queryParams;
      if (params['errorMsg']) {
      this.errorMsg = params['errorMsg'];
    }
    }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      id: [''],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required,Validators.minLength(4)]]
    });

  }

   // convenience getter for easy access to form fields
   get f() { 
     return this.loginForm.controls; 
    }
   
  onReset() {
    this.submitted = false;
    this.errorMsg = null;
    this.loginForm.reset();
  }

  onSubmit(): void {
    this.submitted = true;

    let params = this.route.snapshot.queryParams;
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL'];
    }

    if(this.loginForm.invalid){
      return;
    }

    const values = this.loginForm.value;
    //let myheaders = new Headers();

    this._loginService.getLoginDetails(values.username).subscribe(response => {
      this.login = new Login(
          response[0].id,
          response[0].username,
          response[0].password,
          response[0].token
        ),
      err => {
        console.log(err);
        this.errorMsg = "Some Internal Server Error...Please try again";
        return;

      }
      
      this.checkLoginDetails(this.login, values.username, values.password);
  });

  }

  checkLoginDetails(login: Login, username: String, password: String) {

    if (login != null || login != undefined) {
      console.log(this.login.id + "::::" + this.login.username + ":::" + this.login.password + "::::" + this.login.token);

      if (username == this.login.username && password == this.login.password) {
        LoginService.authToken = this.login.token;

        //Setting token and save it in db
        let current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
   
        let auth = new Auth(null, this.login.id, this.login.token, current_time);
        
        this._loginService.insertAuthDetails(auth).subscribe(response => {
          // console.log("after inserted auth:"+response);

          //after setting auth value in db 
          //store the token in localstorage
          localStorage.setItem('token', this.login.token);



        },
          err => {
            console.log(err);
            this.errorMsg = "Some Internal Server Error...Please try again";
            return;
          });
        //setting session login id
        let loginid = this.login.id;
        LoginService.sessionLoginId = loginid;

        //setting product count in cart if any
       this._cartService.getProductCountforViewCart(loginid);
      
       //setting price for the cart if any  
       this._cartService.getProductPriceforViewCart(loginid);

        
        
        //redirecting to previous url if any
        if (this.redirectURL) {
          this.router.navigateByUrl(this.redirectURL);
          //.catch(() => this.router.navigate(['/home']))
        } else {
          this.router.navigate(['/home']);
        }
        //window.location.reload();
      } else {
        this.errorMsg = "Invalid Username/Password!!!";
        return;
      }


    } else {

      this.errorMsg = "Invalid Username/Password!!!";
      return;
    }
  }

  
}
