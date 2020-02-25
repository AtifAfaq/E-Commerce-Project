import { Component, OnInit, NgZone } from '@angular/core';
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
  loading = false;

  constructor(
    public router: Router,
    public zone: NgZone
  ) { }

  ngOnInit() {
    this.getMyOrders();
  }


  orderDetail(item) {
    this.router.navigate(['/seller-detail/' + item.key]);
  }


  getMyOrders() {
    var self = this;
    self.loading = true;
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
        this.zone.run(() => {
          if (product.uid == localStorage.getItem('uid')) {
            if (!product.status) {
              this.pendingArray.push(this.myOrders[i])
            }
            if (product.status == "accepted") {
              this.acceptedArray.push(this.myOrders[i])
            }
            if (product.status == "shipped") {
              this.shippedArray.push(this.myOrders[i])
            }
            if (product.status == "delivered") {
              this.deliveredArray.push(this.myOrders[i])
            }
            if (product.status == "cancelled") {
              this.cancelledArray.push(this.myOrders[i])
            }
          }
        })
      })
    }

    this.pendingArray = this.pendingArray.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });

    this.acceptedArray = this.acceptedArray.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });

    this.shippedArray = this.shippedArray.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });

    this.deliveredArray = this.deliveredArray.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });

    this.cancelledArray = this.cancelledArray.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });

    this.loading = false;
  }
}
