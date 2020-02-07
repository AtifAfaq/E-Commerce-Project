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
  constructor(public router: Router) {

  }
  AddtoCart() {
    var retreivedProducts = localStorage.getItem("products");
    this.myArray = JSON.parse(retreivedProducts);
    if (!this.myArray) {
      debugger;
      this.myArray = [];
    }
    this.product.productQty = this.productQty;
    this.myArray.push(this.product);
    debugger;
    localStorage.setItem("products", JSON.stringify(this.myArray));
    this.router.navigate(["/cart"]);
    console.log(this.myArray);
  }



}
