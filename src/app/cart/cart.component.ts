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
  totalPrice: number;
  productQty: number = 1;
  constructor(public router: Router,
    public service: DataCollectorService) { }

  ngOnInit() {
    this.ShowProducts()
  }

  ShowProducts() {
    var retreivedProducts = localStorage.getItem("products");
    this.myArray = JSON.parse(retreivedProducts);
    debugger;
    if (!this.myArray) {
      debugger;
      this.myArray = [];
    }

  }

  increaseValue(p) {
    (p.productQty++);
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


}
