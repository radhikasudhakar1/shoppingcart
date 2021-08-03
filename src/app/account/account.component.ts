import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from './account.service';
import { LoginService } from '../login/login.service';
import { Login } from '../login/login.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  createaccount: FormGroup;
  errorMsg: String;
  login: Login;

  submitted = false;

  constructor(private fb: FormBuilder, private router: Router,
    private _accountService: AccountService, private _loginService: LoginService) { }

  checkPassword(control: FormControl) {
    let password = control.value;
    console.log("password:" + password);
    return null;
  }

  ngOnInit() {
    this.createaccount = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
      conpassword: ['', [Validators.required, this.checkPassword]],
      firstname: ['', Validators.required],
      lastname: ['',],
      emailid: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal: ['', Validators.required],
      country: ['', Validators.required],
      language: ['', Validators.required]

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createaccount.controls; }

  onSubmit(): void {

    let account = this.createaccount.value;

    this.submitted = true;

    // stop here if form is invalid
    if (this.createaccount.invalid) {
      return;
    }

    let username = this.createaccount.get("username").value;
    let password = this.createaccount.get("password").value;


    //check the username already exist
    this._loginService.checkUsername(username).subscribe((data: any) => {
      console.log("Return from checkusername:" + data);
      if (data == undefined || data == null || data == 1) {
        this.errorMsg = "Username already exist! Please change the username";
        return;
      } else {
        //console.log("user"+this.createaccount.get("username").value+" passs"+this.createaccount.get("password").value);
        this._accountService.getAccountMaxId().subscribe((data: any) => {

          if (data[0]["accountid"] == undefined || data[0]["accountid"] == null) {
            account.accountid = 1;
          } else {
            account.accountid = data[0]["accountid"]+1;
          }
        
          console.log("Accountid:"+account.accountid);
          this._loginService.getLoginMaxId().subscribe((data: any) => {

            let newLoginId = 0;
            if (data[0]["id"] == undefined || data[0]["id"] == null) {
              newLoginId = 1;
            } else {
              newLoginId = data[0]["id"] + 1;
            }
            account.loginid = newLoginId;
            this.login = new Login(newLoginId, username, password, 'new');

            this._loginService.insertLoginDetails(this.login).subscribe(response => {
              // console.log("after inserted login details"+ response);
            },
              err => {
                console.log(err);
                this.errorMsg = "Some Internal Server Error...Please try again";
                return
              }
            );

            this._accountService.insertAccountDetails(account).subscribe(response => {
              //   console.log("after inserted:"+response);
            },
              err => {
                console.log(err);
                this.errorMsg = "Some Internal Server Error...Please try again";
                return
              }
            );

            console.log("new account added successfully");

            this.errorMsg = "Account added successfully!!! Please login with your credentials";
            this.router.navigate(['/login'], { queryParams: { 'errorMsg': this.errorMsg } });
            return;
          }
          );
        }
        );
      }
    });
  }
}
