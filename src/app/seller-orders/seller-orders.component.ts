import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent implements OnInit {

  myOrders: Array<any> = [];

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
          temp.key = key;           //   {name: 'Atif', key: 'asjdUIH32jnUYHIK8'} 
          for (var i = 0; i < temp.myArray.length; i++) {
            if (temp.myArray[i].uid == localStorage.getItem('uid')) {
              self.myOrders.push(temp);
            }
          }
        }
        console.log(self.myOrders);
      })
  }

}
