import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
  status;
  searchQuery: any;
  allProducts: any = [];

  constructor(public router: Router) {
    this.getCartCount();
  }


  public fooSubject = new Subject<any>();

  publishSomeData(data: any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
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
    console.log(this.myArray)
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
