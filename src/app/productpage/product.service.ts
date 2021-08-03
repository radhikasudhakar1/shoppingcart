import {Injectable} from '@angular/core';
import {Product} from './product.model';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class ProductService{    
    constructor(private http: HttpClient){}

    getProductsByCategoryId(categoryid: string): Observable<Product[]>
    {
        console.log("inside getProductsByCategoryId()");
        const url = "http://localhost:3000/category/"+categoryid;
        return this.http.get<Product[]>(url);
    }
    getProductsDetailsByProductId(productid: number): Observable<Product>
    {
        //console.log("inside getProductsDetailsByProductId");
        const url = "http://localhost:3000/product/"+productid;
        return this.http.get<Product>(url);
    }
    getAllProductsFromDB(): Observable<Product[]>
    {
        console.log("inside getAllProductsFromDB");
        const url = "http://localhost:3000/getallproducts";
        return this.http.get<Product[]>(url);
    }
}
