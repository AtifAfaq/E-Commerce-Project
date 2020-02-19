import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataCollectorService {
  categoriesData = [];
  myArray: any = [];
  product: any = {};
  isEdit: boolean;
  productQty: number;
  totalPrice: number;
  cartCount: any = 0;
  subTotal: any = 0;
  shipmentCharges: any = 0;
  totalBill: any = 0;
  orderObj: any = {};
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


  AddtoCart(qty) {
    var productMatched = false;
    var retreivedProducts = localStorage.getItem("products");
    this.myArray = JSON.parse(retreivedProducts);
    if (!this.myArray) {
      this.myArray = [];
    }
    this.myArray.forEach(product => {
      if (product.key == this.product.key) {
        product.productQty = product.productQty + qty;
        productMatched = true;
      }
    });

    if (!productMatched) {
      this.myArray.push(this.product);
    }
    localStorage.setItem("products", JSON.stringify(this.myArray));
    console.log(this.myArray);
    this.getCartCount();
  }



}
