import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCollectorService } from './../data-collector.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  myArray: any = [];
  allProducts = [];
  orderObj: any = {};

  constructor(public router: Router,
    public service: DataCollectorService) {
    this.orderObj = this.service.orderObj
    console.log(this.orderObj)

  }

  ngOnInit() {
  }
  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;
  }


  bringorder(i) {
    var self = this;
    firebase.database().ref().child('orders/' + self.myArray[i].key)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allProducts.push(temp);
          console.log(this.allProducts)
        }
      })
  }

}

