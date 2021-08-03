import {Injectable,EventEmitter} from '@angular/core';
import {Login} from './login.model';

import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Auth } from './auth.model';

import * as ConstantVar from '../common/constants';

@Injectable({
    providedIn: 'root'
  })
  

export class LoginService{
    
    public static authToken="";
    public static isLoggedIn = false;
    public static sessionLoginId: number;
    $loggedin = new EventEmitter();

    

    constructor(private http: HttpClient){

    }
    ngOnInit(){
       
    }

    getLoginDetails(username: String): Observable<Login>
    {
        this.$loggedin.emit(localStorage.getItem('token'));
        const url =  ConstantVar.BASEURL + ConstantVar.LOGIN + ConstantVar.GETBYUSERNAME + username;
        return this.http.get<Login>(url);
    }

    insertLoginDetails(login: Login): Observable<HttpResponse<Login>>
    {
        const url = ConstantVar.BASEURL + ConstantVar.LOGIN + ConstantVar.INSERTDETAILS;
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache');
        return this.http.post<Login>(url, login, {
            headers: httpHeaders,
            observe: 'response'
        });
    }

    public getLoginMaxId()
    {
        //const url = "http://localhost:3000/login/getmaxloginid";
        const url = ConstantVar.BASEURL + ConstantVar.LOGIN + ConstantVar.MAXLOGINID;
        return this.http.get(url);
    }

    getAuthToken() {
        return LoginService.authToken;
    }

    loggedIn(){
        ///need to use if for logged in status and loginid 
        return !!localStorage.getItem('token');
    }

    loggedOut(){
        localStorage.removeItem('token');     
    }

    getLoginId(){
        return LoginService.sessionLoginId;
    }
    

    public getAuthMaxId()
    {
        const url = ConstantVar.BASEURL + ConstantVar.AUTH + ConstantVar.MAXAUTHID;
        return this.http.get(url);
    }

    insertAuthDetails(auth: Auth): Observable<HttpResponse<Auth>>
    {
        const url = ConstantVar.BASEURL + ConstantVar.AUTH;
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache');
        return this.http.post<Auth>(url, auth, {
            headers: httpHeaders,
            observe: 'response'
        });
    }

    checkUsername(username: string)//: Observable<HttpResponse<string>>
    {
        const url = ConstantVar.BASEURL + ConstantVar.LOGIN + ConstantVar.CHECKUSERNAME + username;
        /* let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache');
        return this.http.post<string>(url, username, {
            headers: httpHeaders,
            observe: 'response'
        }); */
        return this.http.get(url);
    }
    
}