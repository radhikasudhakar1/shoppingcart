import {Injectable} from '@angular/core';
import {Account} from './account.model';

import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import * as ConstantVar from '../common/constants';

@Injectable({
    providedIn: 'root'
  })

export class AccountService{

    constructor(private http: HttpClient){

    }

    insertAccountDetails(account: Account): Observable<HttpResponse<Account>>
    {
        //const url = "http://localhost:3000/account/add";
        const url  = ConstantVar.BASEURL + ConstantVar.ACCOUNT + ConstantVar.INSERTDETAILS;
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json') .set('Cache-Control', 'no-cache');
        return this.http.post<Account>(url, account, {
            headers: httpHeaders,
            observe: 'response'
        });
    }

    public getAccountMaxId()
    {
        //const url = "http://localhost:3000/account/getmaxaccountid";
        const url  = ConstantVar.BASEURL + ConstantVar.ACCOUNT + ConstantVar.MAXACCTID;
        return this.http.get(url);
    }
    
}