import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCollectorService } from './../data-collector.service';
import * as firebase from 'firebase';

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
  firebaseProducts: any = [];

  constructor(public router: Router,
    public service: DataCollectorService) {
  }

  ngOnInit() {
    this.ShowProducts()
  }


  getCartProducts() {
    var self = this;
    for (var i = 0; i < self.myArray.length; i++) {
      firebase.database().ref().child('products/' + self.myArray[i].key)
        .once('value', (snapshot) => {
          var data = snapshot.val();
          self.firebaseProducts.push(data);
        })
    }
  }


  ShowProducts() {
    var retreivedProducts = localStorage.getItem("products");
    this.myArray = JSON.parse(retreivedProducts);
    if (!this.myArray) {
      this.myArray = [];
    }
    if (this.myArray) {
      this.getCartProducts();
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
    var outOfStock = false;
    this.firebaseProducts.forEach(product => {
      if (product.productName == p.productName) {
        if (product.availableQty > p.productQty) {
          p.productQty++;
          var retreivedProducts = localStorage.getItem("products");
          this.myArray = JSON.parse(retreivedProducts);
          this.myArray[index].productQty++;
          localStorage.setItem("products", JSON.stringify(this.myArray));
          this.getTotalCost();
        }
        else {
          outOfStock = true;
        }
      }
    });
    if (outOfStock) {
      alert("Product out of stock!");
    }
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
