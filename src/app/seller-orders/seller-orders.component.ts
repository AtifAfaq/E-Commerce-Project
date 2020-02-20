import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

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

  constructor() { }

  ngOnInit() {
    this.getMyOrders();

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
                console.log(self.myOrders)
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
    this.myOrders.forEach(product => {
      if (product.status == "pending") {
        this.pendingArray.push(product)
      }
      if (product.status == "accepted") {
        this.acceptedArray.push(product)
      }
      if (product.status == "shipped") {
        this.shippedArray.push(product)
      }
      if (product.status == "delivered") {
        this.deliveredArray.push(product)
      }
      if (product.status == "cancelled") {
        this.cancelledArray.push(product)
      }
    })
  }

}
