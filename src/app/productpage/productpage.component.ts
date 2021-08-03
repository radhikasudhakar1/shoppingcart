import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CartService } from '../cart/cart.service';
import $ from 'jquery';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit, AfterViewInit {

  public productDetails : Product;

  constructor(private route: ActivatedRoute, private _productService: ProductService) { }

  ngOnInit() {
    let productid = this.route.snapshot.paramMap.get("productid");
    console.log("PRoductid in product comp:"+productid);

    this._productService.getProductsDetailsByProductId(Number(productid)).subscribe(
      response => {
        console.log("RESPONSE:"+response[0].name);
        this.productDetails = new Product(
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
        console.log("NAME:"+this.productDetails.name);
        
      }
    );
  }

  ngAfterViewInit(){

    setTimeout(() => {
  // PRODUCT DETAILS SLICK
  $('#product-main-view').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-view',
  });

  $('#product-view').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
    asNavFor: '#product-main-view',
  });

  // PRODUCT ZOOM
  $('#product-main-view .product-view').zoom();

  });
}

}
