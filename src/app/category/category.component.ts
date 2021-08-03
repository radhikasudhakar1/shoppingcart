import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../productpage/product.service';
import { Product } from '../productpage/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
    private _productService: ProductService, private _loginService: LoginService,
    private _cartService: CartService) { }

    products = new Array<Product>();
    
  ngOnInit() {
    
    console.log("inside category ngOnInit()");
    let categoryid = this.route.snapshot.paramMap.get("catid");

    this._productService.getProductsByCategoryId(categoryid).subscribe(response => {
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
    })
  }

  addToCart(productid: number) {
    let loginid = LoginService.sessionLoginId;
    //check logged status
    if (loginid != null || loginid != undefined) {
      //add product into cart
      this._cartService.addProductsIntoCart(productid, loginid);
      this.router.navigate(['/home']);
    } else {
      console.log("url before nagivatiing:"+this.route.snapshot.url);
      this.router.navigate(['/login'],{queryParams:{'redirectURL': this.route.snapshot.url}});
      return;
    }
    return;
  }

  getProductPage(productid: number){
    this.router.navigate(['/product/'+productid])
  }
}
