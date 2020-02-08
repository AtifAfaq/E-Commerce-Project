import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
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
  totalPrice: number;
  productQty: number = 1;
  addTotal: number;
  totalBill: number;
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

  }

  increaseValue(p) {
    p.productQty++;
  }


  decreaseValue(p) {
    if (p.productQty > 1) {
      p.productQty--;
    }
  }

  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;
  }

  AddTotal(p) {
    var addTotal = Number(p.productQty) * Number(p.discountedPrice);
    addTotal += this.addTotal;
    debugger;
  }

  TotalBill() {
    var totalBill = this.addTotal;
    // + p.deliveryFee;
  }
  confirmOnly(i) {
    debugger;
    this.Currentproduct = this.myArray[i];
    this.activeIndex = i;

    console.log(this.myArray);
  }
  deleteData(i) {
    this.myArray.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(this.myArray));
    console.log(this.myArray);
  }

}
