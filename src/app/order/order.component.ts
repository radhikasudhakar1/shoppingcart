import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { OrderService } from './order.service';
import { Orderhistory } from './orderhistory.model';
import { LoginService } from '../login/login.service';
import { stringify } from 'querystring';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLinkRendererComponent } from './RouterLinkRendererComponent';
import { Order } from './order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  enableOrderHistoryGrid = false;
  enableOrderGrid = false;
  loginid = LoginService.sessionLoginId;
  errorMsg: string;
  isError = false;
  public url: string = "";

  columnOrderHistoryDefs = [
    {
      headerName: 'Order ID',
      field: 'orderid',
      cellRendererFramework: RouterLinkRendererComponent,
      cellRendererParams: {
        inRouterLink: 'vieworder',
      }
    },
    { headerName: 'Status', field: 'orderstatus' },
    { headerName: 'Payment Type', field: 'paymenttype' },
    { headerName: 'Amount', field: 'paymentamount' },
    { headerName: 'Date & Time', field: 'datetime' },
    { headerName: 'Description', field: 'description' }
  ];

  columnOrderDefs = [
    { headername: 'Order ID', field: 'orderid'},
    { headername: 'Product ID', field: 'productid'},
    { headername: 'No of Products', field: 'noofproducts'},
    { headername: 'Price', field: 'price'},
    { headername: 'Description', field: 'description'},
  ];

  rowOrderHistoryData: Array<Orderhistory>;

  rowOrderData: Array<Order>;

  /*rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxter', price: 72000 }
];*/

  constructor(private _orderService: OrderService, private router: Router,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.url = this.router.url;
    console.log("URL:", this.url);
    if (this.url.match('vieworder')) {
      
      let orderid = this.route.snapshot.paramMap.get("orderid");
      console.log("Got order id:" + orderid);

      this._orderService.getOrderByOrderId(orderid).subscribe(response => {
        this.rowOrderData = response.map(item => {
          return new Order ( item.orderid,item.productid, item.noofproducts , item.price
            , item.description);
        });
       console.log("orders length=" + this.rowOrderData.length);
        if (this.rowOrderData.length == 0) {
          this.isError = true;
          this.errorMsg = "No orders for this order id!!!!";
          this.enableOrderGrid = false;
        }else{
          this.enableOrderGrid = true;
        }
      });
      
    }
    else {
      this._orderService.getOrderhistoryByLoginId(this.loginid).subscribe(response => {

        this.rowOrderHistoryData = response.map(item => {
          return new Orderhistory(
            item.orderid, item.loginid, item.orderstatus, item.description,
            item.paymenttype, item.paymentamount, item.datetime
          );
        });
        console.log("orderhistory length=" + this.rowOrderHistoryData.length);
        if (this.rowOrderHistoryData.length == 0) {
          this.isError = true;
          this.errorMsg = "No order history!!!!";
          this.enableOrderHistoryGrid = false;
        }else{
          this.enableOrderHistoryGrid = true;
        }
      });
    }
  }

}
