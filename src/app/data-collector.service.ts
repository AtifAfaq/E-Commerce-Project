import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataCollectorService {

  myArray: any = [];
  product: any = {};
  isEdit: boolean;
  productQty: number;
  cartCount: any = 0;

  constructor(public router: Router) {
    this.getCartCount();
  }


  getCartCount() {
    this.cartCount = 0;
    var retreivedProducts = localStorage.getItem("products");
    this.myArray = JSON.parse(retreivedProducts);
    if (this.myArray) {
      this.myArray.forEach(product => {
        this.cartCount = this.cartCount + product.productQty;
      });
    }
  }


  AddtoCart() {
    var retreivedProducts = localStorage.getItem("products");
    this.myArray = JSON.parse(retreivedProducts);
    if (!this.myArray) {
      this.myArray = [];
    }
    this.myArray.forEach(product => {
      if (product.brand == this.product.brand && product.key == this.product.key) {
        debugger;
        this.product.productQty++;
        localStorage.setItem("products.productQty", this.product.productQty);
      }
    });

    this.myArray.push(this.product);
    localStorage.setItem("products", JSON.stringify(this.myArray));
    this.router.navigate(["/cart"]);
    console.log(this.myArray);
    this.getCartCount();
  }



}
