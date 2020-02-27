import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {

  key: string = '';
  order: any = {};
  orderProducts = [];
  cancelProducts = [];
  allProducts = [];
  loading = false;
  subTotal;
  shipmentCharges;
  totalBill;
  productStatus: boolean = false;
  shippedStatus: boolean = false;

  constructor(
    public router: ActivatedRoute,
    public route: Router) {
    this.key = router.snapshot.params.key;
    this.getUserDetail(this.key);
  }


  ngOnInit() {

  }


  getUserDetail(key) {
    firebase.database().ref().child('orders/' + key)
      .once('value', (snapshot) => {
        this.order = snapshot.val();
        this.allProducts = this.order.myArray;
        this.order.myArray.forEach(product => {
          let uid = localStorage.getItem('uid');
          if (uid == product.uid) {
            if (product.status != "cancelled") {
              this.orderProducts.push(product)
            }
            if (product.status == "cancelled") {
              this.cancelProducts.push(product)
            }
          }
        })
        this.getTotalCost();
        this.getAcceptedStatus();
      })
      .catch((e) => {
        alert(e.message);
      })
  }


  getAcceptedStatus() {
    for (var i = 0; i < this.orderProducts.length; i++) {
      if (this.orderProducts[i].status == 'accepted') {
        this.productStatus = true;
      }
      if (this.orderProducts[i].status == 'shipped') {
        this.shippedStatus = true;
      }
    }
  }


  shipOrder() {
    var self = this;
    self.allProducts.forEach(product => {
      if (product.uid == localStorage.getItem('uid')) {
        if (product.status == 'accepted') {
          product.status = 'shipped';
        }
      }
    });
    var updates = {};
    updates['/orders/' + self.key + '/myArray'] = self.allProducts;
    firebase.database().ref().update(updates).then(() => {
      alert("Order has been shipped successfully!");
      this.route.navigate(['/seller-orders']);
    })
  }
  deliverOrder() {
    var self = this;
    self.allProducts.forEach(product => {
      if (product.uid == localStorage.getItem('uid')) {
        if (product.status == 'shipped') {
          product.status = 'delivered';
        }
      }
    });
    var updates = {};
    updates['/orders/' + self.key + '/myArray'] = self.allProducts;
    firebase.database().ref().update(updates).then(() => {
      alert("Order has been shipped successfully!");
      this.route.navigate(['/seller-orders']);
    })
  }

  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;
  }


  getTotalCost() {
    this.subTotal = 0;
    this.shipmentCharges = 0;
    this.totalBill = 0;
    this.orderProducts.forEach(product => {
      this.subTotal = Number(this.subTotal) + Number(product.productQty) * Number(product.discountedPrice);
      this.shipmentCharges = Number(this.shipmentCharges) + Number(product.deliveryFee);
    });
    this.totalBill = this.subTotal + this.shipmentCharges;
  }


  acceptOrder(p, index, status) {
    var self = this;
    self.allProducts.forEach(product => {
      if (product.key == p.key) {
        product.status = status;
        self.updateStatus(index, status);
      }
    });
  }


  updateStatus(index, status) {
    var self = this;
    var updates = {};
    updates['/orders/' + self.key + '/myArray'] = self.allProducts;
    firebase.database().ref().update(updates).then(() => {
      self.orderProducts[index].status = status;
      if (status == "cancelled") {
        this.updateQty(index);
      }
    })
  }


  updateQty(index) {
    var self = this;
    firebase.database().ref().child('products/' + self.orderProducts[index].key)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        data.availableQty = Number(data.availableQty) + Number(self.orderProducts[index].productQty);
        var updates = {};
        updates['/products/' + self.orderProducts[index].key + '/' + 'availableQty'] = data.availableQty;
        firebase.database().ref().update(updates)
          .then(() => {
            alert(" Product has been cancelled from order")
          })
      })
  }

}
