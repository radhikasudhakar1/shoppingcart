import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Orderhistory } from './orderhistory.model';
import { Order } from './order.model';

@Injectable({
    providedIn: 'root'
  })

export class OrderService{    
    constructor(private http: HttpClient){}

    getOrderhistoryByLoginId(loginid: number): Observable<Orderhistory[]>
    {
        //console.log("inside getProductsByCategoryId()");
        const url = "http://localhost:3000/orderhistory/"+loginid;
        return this.http.get<Orderhistory[]>(url);
    }

    getOrderByOrderId(orderid: string): Observable<Order[]>
    {
        //console.log("inside getProductsByCategoryId()");
        const url = "http://localhost:3000/order/"+orderid;
        return this.http.get<Order[]>(url);
    }
}