
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Orderhistory } from '../order/orderhistory.model';
import { Order } from '../order/order.model';

@Injectable({
    providedIn: 'root'
})

export class PaymentService {

    
    constructor(private http: HttpClient, private router: Router) { }

    insertOrderHistory(orderhistory: Orderhistory): Observable<HttpResponse<Orderhistory>> {
        console.log("inside insertOrderHistory() ");
        const url = "http://localhost:3000/addorderhistory";
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache');
        return this.http.post<Orderhistory>(url, orderhistory, {
            headers: httpHeaders,
            observe: 'response'
        });
    }

    insertOrders(orders: Order): Observable<HttpResponse<Order>> {
        console.log("inside insertOrders()");
        const url = "http://localhost:3000/addorders";
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache');
        return this.http.post<Order>(url, orders, {
            headers: httpHeaders,
            observe: 'response'
        });
    }
}
