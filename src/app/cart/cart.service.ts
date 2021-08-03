import { Injectable, Input } from '@angular/core';
import { Cart } from './cart.model';

import { Observable,  Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Dbcart } from './dbcart.model';
import { Router } from '@angular/router';
import { ProductService } from '../productpage/product.service';
import { Product } from '../productpage/product.model';
import { ThrowStmt } from '@angular/compiler';

import * as ConstantVar from '../common/constants';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    //@Input() current_time; 
    cart = new Array<Cart>();
    cartProductsMap = new Map();
    productDetails: Product;

    //public static sessionCartProductCount: number;


    //Product Count in header
    private productCountSubject = new Subject<any>();

    sendMessage(message: string) {
        this.productCountSubject.next({ text: message });
    }

    clearMessages() {
        this.productCountSubject.next();
    }

    getMessage(): Observable<any> {
        return this.productCountSubject.asObservable();
    }

    //Cart Product Price in header
    private priceSubject = new Subject<any>();

    sendPrice(price: string) {
        this.priceSubject.next({ price: price });
    }

    clearPrice() {
        this.priceSubject.next();
    }

    getPrice(): Observable<any> {
        return this.priceSubject.asObservable();
    }


    constructor(private http: HttpClient, private router: Router, private _productService: ProductService) { }

    addProductsIntoCart(productid: number, loginid: number) {
        //console.log("inside addProductsIntoCart");
        //inserting cart details in database
        let current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let productcount = 0;
        let price = 0;

        //get Product Details from Product table
        this._productService.getProductsDetailsByProductId(productid).subscribe( response => {
            console.log("RESPONSE:"+response[0] + "id:"+response[0].price);
            this.productDetails = new Product(
                    response[0].productid,   response[0].categoryid, 
                    response[0].name,  response[0].description,
                    response[0].price,  response[0].isstockavailable, 
                    response[0].totalno,  response[0].isofferavailable, 
                    response[0].offerprice,  response[0].reviewid,
                    response[0].imagepath
                );
      
        console.log("PRoduct PRICE:"+this.productDetails.price);

        //check for products already in cart and add +1 to noofproducts
        let cartfromdb: Dbcart = new Dbcart();
        this.getProductCountInDB(productid, loginid)
            .subscribe(data => {
                const response = data[0];
                //console.log("response:"+data);
                if (this.isEmptyObject(response) || response !=null || response != undefined) {
                    //console.log("cartid:"+response.cartid);
                    cartfromdb.cartid = response.cartid,
                    cartfromdb.loginid = response.loginid,
                    cartfromdb.productid = response.productid,
                    cartfromdb.noofproducts = response.noofproducts,
                    cartfromdb.datetime = response.datetime,
                    cartfromdb.cartdescription = response.cartdescription
                    cartfromdb.price = response.price;

                    //console.log("cartid:" + cartfromdb.cartid + " noofproduct:" + cartfromdb.noofproducts);
                    productcount = cartfromdb.noofproducts + 1;
                    
                    console.log("Before product count:"+productcount+" price:"+price+ "Offerprice:"+this.productDetails.offerprice);
                    if(this.productDetails.offerprice==0){
                        price = productcount * this.productDetails.price;
                    }else{
                        price = productcount * this.productDetails.offerprice;
                    }
                    
                    console.log("After product count:"+productcount+" price:"+price);
                    //update already existing record with one more product count
                    this.updateNoOfProducts(cartfromdb.cartid, productcount,price)
                        .subscribe(response => {
                            console.log(response);
                        },
                            err => {
                                console.log(err);
                                //this.errorMsg = "Some Internal Server Error...Please try again";
                                return;
                            });                    
                }else {
                    
                    productcount = productcount + 1;

                    console.log("Else Before product count:"+productcount+" price:"+price+ "Offerprice:"+this.productDetails.offerprice);

                    if(this.productDetails.offerprice==0){
                        price = productcount * this.productDetails.price;
                    }else{
                        price = productcount * this.productDetails.offerprice;
                    }
                    console.log("else Before product count:"+productcount+" price:"+price);
                    //insert into cart table
                    let insertcartdetails = new Dbcart(null, loginid, productid, productcount, current_time, "inserting", price);
                    //console.log("beforing insertcartdetails productcount:" + productcount + " loginid:" + loginid + " productid:" + productid);
                    
                    this.insertCartDetails(insertcartdetails).subscribe(response => {
                        console.log("data added succesfully" + response);

                        //CartService.sessionCartProductCount++;
                    },
                        err => {
                            console.log(err);
                            //this.errorMsg = "Some Internal Server Error...Please try again";
                            return
                        }
                    );
                }
                 //setting product count in cart if any
                this.getProductCountforViewCart(loginid);

                //setting price for the cart if any
                this.getProductPriceforViewCart(loginid);


                this.router.navigate(['/home']);


            });
        });
    }
    //emits a single value, an array of cart
    getCartDetails(loginid: number): Observable<Dbcart[]> {
        console.log("inside getCartDetails loginid:"+loginid);
        //const url = "http://localhost:3000/getcart/" + loginid;
        const url = ConstantVar.BASEURL + ConstantVar.GETCART + loginid;
        return this.http.get<Dbcart[]>(url);
        //return of(this.cart);
    }

    deleteCartDetails(loginid: number): Observable<Dbcart[]>{
        //const url = "http://localhost:3000/deletecartbyid/"+ loginid;
        const url = ConstantVar.BASEURL + ConstantVar.DELETECARTBYID + loginid;
        return this.http.delete<Dbcart[]>(url);
    }
    insertCartDetails(cart: Dbcart): Observable<HttpResponse<Dbcart>> {
        //const url = "http://localhost:3000/addcart";
        const url = ConstantVar.BASEURL + ConstantVar.ADDCART;
        let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Cache-Control', 'no-cache');
        return this.http.post<Dbcart>(url, cart, {
            headers: httpHeaders,
            observe: 'response'
        });
    }

    getProductCountInDB(productid: number, loginid: number): Observable<Dbcart> {
        console.log("inside getProductCountInDB()loginid:"+loginid+"productid:"+productid);
        /*let params = new HttpParams();
        params = params.append('loginid', loginid);
        params = params.append('productid', productid);
        return this.http.get<Dbcart>("http://localhost:3000/checkproduct/", { params: params });*/
        return this.http.get<Dbcart>("http://localhost:3000/checkproduct/" + loginid + "/" + productid);
    }
    updateNoOfProducts(cartid: number, noofproduct: number, price: number): Observable<Dbcart> {
        console.log("inside updateNoOfProducts");
        return this.http.get<Dbcart>("http://localhost:3000/updatenoofproduct/" + cartid + "/" + noofproduct+"/"+ price);
    }
    isEmptyObject(obj) {
        return (obj && (Object.keys(obj).length === 0));
      }

    getProductCountFromCart(loginid: number): Observable<string>{
        const url = "http://localhost:3000/getproductcount/" + loginid;
        return this.http.get<string>(url);
    }
    getProductPriceFromCart(loginid: number): Observable<string>{
        const url = "http://localhost:3000/getproductprice/" + loginid;
        return this.http.get<string>(url);
    }
    /*getSessionCartProductCount(){
        return CartService.sessionCartProductCount;
    }*/

    getProductCountforViewCart(loginnid: number){
    console.log("loginid in cart component for product count:"+loginnid);
    this.getProductCountFromCart(loginnid).subscribe(response => {
        let proCount = response[0]['count'];
      console.log("Count:"+response[0]['count']);
      if(proCount == null || proCount == undefined){
          this.sendMessage("0");
      }else{
        this.sendMessage(response[0]['count']);
      }
    });
  }
  getProductPriceforViewCart(loginnid: number){
    console.log("loginid in cart component for product price:"+loginnid);
    this.getProductPriceFromCart(loginnid).subscribe(response => {
        let proPrice = response[0]['price'];
      console.log("product price in cart:"+response[0]['price']);
      if(proPrice === null || proPrice === undefined){
          this.sendMessage("0");
      }else{
        this.sendPrice(response[0]['price']);
      }
      //return response[0]['count'];
    });
}
}