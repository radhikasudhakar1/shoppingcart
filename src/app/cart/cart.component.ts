import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../productpage/product.service';
import { LoginService } from '../login/login.service';
import { CartService } from './cart.service';
import { Router, NavigationExtras } from '@angular/router';
import { Product } from '../productpage/product.model';
import { Dbcart } from './dbcart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //cart = new Array<Cart>();
  products = new Map();
  productsDetails = new Array<Product>();
  loginid = LoginService.sessionLoginId;
  public dbcart = new Array<Dbcart>();
  errorMsg: string;
  isError = false;

  constructor(private router: Router,
    private _cartService: CartService,
    private _productService: ProductService) { }

  ngOnInit() {

    //get details from db if not exist set errormsg
    if (this.loginid === null || this.loginid === undefined) {
      this.isError = true;
      this.errorMsg = "Please login to view your cart";
      return;
    } else {
      this._cartService.getCartDetails(this.loginid).subscribe(response => {

        this.dbcart = response.map(item => {
          return new Dbcart(
            item.cartid, item.loginid, item.productid, item.noofproducts,
            item.datetime, item.cartdescription
          );
        });
        console.log("dbcart length:" + this.dbcart.length);
        if (this.dbcart.length == 0) {
          this.isError = true;
          this.errorMsg = "No products in your cart!!!!";
          return;
        } else {
          //populate cart object
          let msg: string = this.dbcart.length.toString();
          console.log("before add cart details msg:"+msg);
          
          this._cartService.sendMessage(msg);

          let productPrice:number = 0 ;
          for (let singlecart of this.dbcart) {

            let productid = singlecart.productid;

            let productCount = singlecart.noofproducts;

            this._productService.getProductsDetailsByProductId(productid).subscribe
              (response => {
                let oneProduct = new Product(
                  response[0].productid,
                  response[0].categoryid,
                  response[0].name,
                  response[0].description,
                  response[0].price,
                  response[0].isstockavailable,
                  response[0].totalno,
                  response[0].isofferavailable,
                  response[0].offerprice,
                  response[0].reviewid,
                  response[0].imagepath
                  );
                console.log("oneProduct:"+oneProduct.productid+" price:"+oneProduct.price);
                this.productsDetails.push(oneProduct);
              });

              //productPrice = productPrice +  (productCount* this.productsDetails); 
          }
        }
      });//end of getCartDetails subscribe
    }
  }

  

  directToPayment() {
    /* let navigationExtras: NavigationExtras = {
       queryParams: {
           "dbcart": this.dbcart
       }
   };*/
    this.router.navigate(['/payment', { "loginid": this.loginid }]);
  }
}
