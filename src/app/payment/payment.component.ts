import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dbcart } from '../cart/dbcart.model';
import { CartService } from '../cart/cart.service';
import { Order } from '../order/order.model';
import { Orderhistory } from '../order/orderhistory.model';
import { PaymentService } from './payment.service';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payment: FormGroup;
  paymentTypes = new Array<string>('Net banking', 'Credit card', 'Paytm', 'UPI', 'Others');
  isDetails: boolean;
  public dbcart = new Array<Dbcart>();
  loginid: number;
  errorMsg: string;
  isError = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private _cartService: CartService, private _paymentService: PaymentService) {
    route.params.subscribe(params => { this.loginid = params['loginid']; });
    this.isDetails = false;
    this.loginid = LoginService.sessionLoginId;
  }

  ngOnInit() {
    this._cartService.getCartDetails(this.loginid).subscribe(response => {

      this.dbcart = response.map(item => {
        return new Dbcart(
          item.cartid, item.loginid, item.productid, item.noofproducts,
          item.datetime, item.cartdescription
        );
      });
      console.log("dbcart length in payment component:" + this.dbcart.length);
      if (this.dbcart.length == 0) {
        this.isError = true;
        this.errorMsg = "No products in your cart, please add it!!!!";
        return;
      }
    });
    this.payment = this.fb.group({
      paymenttype: ['', Validators.required],
      carddetails: ['', Validators.required],
      cardname: ['', Validators.required]
    });

  }
  paymentSelect() {
    console.log("inside paymentSelect() logindi:" + this.loginid);
    this.isDetails = true;
    return;
  }
  onSubmit() {
    let madepayment = this.payment.value;
    console.log("before cart details");
    //get cart details
    this._cartService.getCartDetails(this.loginid).subscribe(
      response => {
        this.dbcart = response.map(item => {
          return new Dbcart(item.cartid, item.loginid, item.productid, item.noofproducts,
            item.datetime, item.cartdescription, item.price);
        });

        //make a entry to order & orderhistory tables
        //orderhistory entry
        let current_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let orderid;
        let price = 0;

        //to get the total amount of the cart
        for(let item of this.dbcart){
           price += item.price;
        }

        let orderhistory = new Orderhistory(null, this.loginid, 1, "successfully added",
          madepayment.paymenttype, price, current_time);
        this._paymentService.insertOrderHistory(orderhistory).subscribe(response => {
          console.log("response from express:" + response.body);
          orderid = response.body;

          //order entry
          for (let singleProduct of this.dbcart) {
            console.log("order idto insert" + orderid + " noofproducts:" + singleProduct.noofproducts);
            let orders = new Order(orderid, singleProduct.productid, singleProduct.noofproducts, price, 'added successfully');
            this._paymentService.insertOrders(orders).subscribe(response => {
              console.log(response);



              //delete the content ie cart items from carttemp table
              this._cartService.deleteCartDetails(this.loginid).subscribe(response => {
                console.log(response);
              }, err => {
                console.log(err);
                return;

              });
            },
              err => {
                console.log(err);
                return;
              });
          }

        },
          err => {
            console.log(err);
            this.errorMsg = "Some Internal Server Error...Please try again";
            return;
          });

      },
      err => {
        console.log(err);
        this.errorMsg = "Some Internal Server Error...Please try again";
        return;
      });

      this.isError = true;
      this.errorMsg = "Order placed successfully !!!!";
      return;
    
  }
}
