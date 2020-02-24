import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent implements OnInit {

  myOrders: Array<any> = [];
  pushOrder = false;
  pendingArray = [];
  acceptedArray = [];
  shippedArray = [];
  deliveredArray = [];
  cancelledArray = [];


  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.getMyOrders();

  }
  orderDetail(item) {
    this.router.navigate(['/seller-detail/' + item.key]);
    debugger;
  }

  getMyOrders() {
    var self = this;
    firebase.database().ref().child('orders')
      .once('value', (snapshot) => {
        var data = snapshot.val();   //  JSON objects array
        for (var key in data) {
          var temp = data[key];     //   {name: 'Atif', city: 'lahore'} 
          temp.key = key;   //   {name: 'Atif', key: 'asjdUIH32jnUYHIK8'} 
          this.pushOrder = false;
          for (var i = 0; i < temp.myArray.length; i++) {
            if (temp.myArray[i].uid == localStorage.getItem('uid')) {
              if (!this.pushOrder) {
                self.myOrders.push(temp);
                this.pushOrder = true;
              }
            }
          }
        }
        this.showPending();
        console.log(self.myOrders);
      })
  }


  showPending() {
    for (var i = 0; i < this.myOrders.length; i++) {
      this.myOrders[i].myArray.forEach(product => {
        for (var i = 0; i < product.myArray.length; i++) {
          if (!product.myArray[i].status) {
            this.pendingArray.push(this.myOrders[i])
          }
          if (product.myArray[i].status == "accepted") {
            this.acceptedArray.push(product)
          }
          if (product.myArray[i].status == "shipped") {
            this.shippedArray.push(product)
          }
          if (product.myArray[i].status == "delivered") {
            this.deliveredArray.push(product)
          }
          if (product.myArray[i].status == "cancelled") {
            this.cancelledArray.push(product)
          }
        }
      })
    }
  }
}
