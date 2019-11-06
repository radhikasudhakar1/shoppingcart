import {Injectable} from '@angular/core';
import {Login} from './login.model';

import {ILogin} from './login';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class LoginService{

    constructor(private http: HttpClient){

    }

    getLoginDetails(): Observable<Login[]>
    {
        const url = "http://localhost:3000/login";
        return this.http.get<Login[]>(url);
    }
    /*getLoginDetails(): ILogin[] {
        return [
            { username: 'test', password: 'test'},
            { username: 'admin', password: 'admin'},
            { username: 'rad', password: 'rad'}
        ];

    }*/
}