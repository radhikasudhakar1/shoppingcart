import { Product } from '../productpage/product.model';
import { ProductService } from '../productpage/product.service';

import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';

import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import $ from 'jquery';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: []
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @Input() loggedinstatus: boolean;
//  @Input() productcount: number;

  category = new Array<Category>();
  subscription: Subscription;

 // messages: any[] = [];

  public proCount: number = 0;
  public proPrice: number = 0;
  
  products = new Array<Product>();


  constructor(private _categoryService: CategoryService, private _cartService: CartService, private _productService: ProductService) {
     // subscribe to cart component for product count
     this.subscription = this._cartService.getMessage().subscribe(message => {
      if (message) {
        //this.messages.push(message);
        console.log("inside header component msg push msg="+message.text);
        this.proCount = message.text;
      } else {
        // clear messages when empty message received
        console.log("else loop ");
        //this.messages = [];
        this.proCount = 0
      }
    });

    // subscribe to cart component for product price
    this.subscription = this._cartService.getPrice().subscribe(price => {
      if (price) {
        //this.messages.push(message);
        console.log("inside header component price push price="+price.price);
        this.proPrice = price.price;
      } else {
        // clear messages when empty message received
        console.log("else loop ");
        //this.messages = [];
        this.proPrice = 0
      }
    });
  }

  clearText(){
    console.log("inside clear text");
    $('#searchTextId').val("");
    //$('div.searchProduct').hide();
    $('#searchProduct').css("visibility", "hidden");
  }
  showText(){
    $('#searchProduct').css("visibility", "visible");
  }
  ngOnDestroy() {
    
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}


  ngOnInit() {
    console.log("loggedinstatus:"+this.loggedinstatus);
  
    this._productService.getAllProductsFromDB().subscribe(response => {
      this.products = response.map(item => {
        return new Product(
          item.productid,
          item.categoryid,
          item.name,
          item.description,
          item.price,
          item.isstockavailable,
          item.totalno,
          item.isofferavailable,
          item.offerprice,
          item.reviewid,
          item.imagepath
        );
      });
    });
    this._categoryService.getAllCategories().subscribe(response => {
    //  console.log('getAllCategories response:', response);
      this.category = response.map(item => {
        return new Category(
          item.categoryid,
          item.categoryname,
          item.categorydescription,
          item.totalnoofproduct
        );
      });
    });
  }

  ngAfterViewInit() {
    // NAVIGATION
    //    debugger;
    setTimeout(() => {
      var responsiveNav = $('#responsive-nav'),
        catToggle = $('#responsive-nav .category-nav .category-header'),
        catList = $('#responsive-nav .category-nav .category-list'),
        menuToggle = $('#responsive-nav .menu-nav .menu-header'),
        menuList = $('#responsive-nav .menu-nav .menu-list');

      catToggle.on('click', function () {
        menuList.removeClass('open');
        catList.toggleClass('open');
      });

      menuToggle.on('click', function () {
        catList.removeClass('open');
        menuList.toggleClass('open');
      });

      $(document).click(function (event) {
        if (!$(event.target).closest(responsiveNav).length) {
          if (responsiveNav.hasClass('open')) {
            responsiveNav.removeClass('open');
            $('#navigation').removeClass('shadow');
          } else {
            if ($(event.target).closest('.nav-toggle > button').length) {
              if (!menuList.hasClass('open') && !catList.hasClass('open')) {
                menuList.addClass('open');
              }
              $('#navigation').addClass('shadow');
              responsiveNav.addClass('open');
            }
          }
        }
      });
    }, 0);

  }

}
