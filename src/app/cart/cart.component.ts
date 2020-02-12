import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCollectorService } from './../data-collector.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  myArray: any = [];
  Currentproduct: any = {};
  activeIndex: any;
  subTotal: any = 0;
  shipmentCharges: any = 0;
  totalBill: any = 0;
  productQty: Number;

  constructor(public router: Router,
    public service: DataCollectorService) { }

  ngOnInit() {
    this.ShowProducts()
  }

  ShowProducts() {
    var retreivedProducts = localStorage.getItem("products");
    this.myArray = JSON.parse(retreivedProducts);
    if (!this.myArray) {
      this.myArray = [];
    }
    setTimeout(() => {
      this.getTotalCost();
    }, 1000);
  }


  getTotalCost() {
    this.subTotal = 0;
    this.shipmentCharges = 0;
    this.totalBill = 0;
    this.myArray.forEach(product => {
      this.subTotal = Number(this.subTotal) + Number(product.productQty) * Number(product.discountedPrice);
      this.shipmentCharges = Number(this.shipmentCharges) + Number(product.deliveryFee);
    });
    this.totalBill = this.subTotal + this.shipmentCharges;
    this.service.getCartCount();
  }


  increaseValue(p, index) {
    if (this.myArray.productQty >= p.productQty)
      debugger;
    p.productQty++;
    var retreivedProducts = localStorage.getItem("products");
    this.myArray = JSON.parse(retreivedProducts);
    this.myArray[index].productQty++;
    localStorage.setItem("products", JSON.stringify(this.myArray));
    this.getTotalCost();

  }



  decreaseValue(p, index) {
    if (p.productQty > 1) {
      p.productQty--;
      var retreivedProducts = localStorage.getItem("products");
      this.myArray = JSON.parse(retreivedProducts);
      this.myArray[index].productQty--;
      localStorage.setItem("products", JSON.stringify(this.myArray));
    }
    this.getTotalCost();
  }


  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;
  }


  confirmOnly(i) {
    this.Currentproduct = this.myArray[i];
    this.activeIndex = i;
  }


  deleteData() {
    this.myArray.splice(this.activeIndex, 1);
    localStorage.setItem("products", JSON.stringify(this.myArray));
    this.getTotalCost();
    console.log(this.myArray);
  }

}
