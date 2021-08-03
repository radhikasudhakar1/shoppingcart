import {Injectable} from '@angular/core';
import {Category} from './category.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import * as ConstantVar from '../common/constants';

@Injectable({
    providedIn: 'root'
  })

export class CategoryService{

    constructor(private http: HttpClient){

    }

    public getAllCategories(): Observable<Category[]>
    {
        //console.log("inside getAllCategories");
        const url = ConstantVar.BASEURL + ConstantVar.CATEGORY + ConstantVar.GETALLDETAILS;
        return this.http.get<Category[]>(url);
    }
}
