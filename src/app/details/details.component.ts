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
  comment: '';
  loading;
  productKey;
  index;
  rating;

  star1: boolean = false;
  star2: boolean = false;
  star3: boolean = false;
  star4: boolean = false;
  star5: boolean = false;

  constructor(public router: Router,
    public service: DataCollectorService) {
    this.orderObj = this.service.orderObj;
  }

  ngOnInit() {
  }


  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;
  }


  reviewDataFirebase() {
    var self = this;
    var review: any = {
      comment: this.comment,
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      uid: localStorage.getItem('uid'),
      productKey: this.productKey,
      rating: this.rating,
      timestamp: Number(new Date())
    }
    this.loading = true;
    var updates = {};
    this.orderObj.myArray[this.index].review = true;
    updates['/orders/' + this.orderObj.key + '/myArray'] = this.orderObj.myArray;
    debugger;
    firebase.database().ref().update(updates).then(() => {
      alert("Review submitted successfully!");
    })
    var postKey = firebase.database().ref().child('reviews').push().key;
    updates['/reviews/' + postKey] = review;
    firebase.database().ref().update(updates)
      .then(() => {
        this.loading = false;
      })
      .catch((e) => {
        this.loading = false;
        alert(e.message);
      })
  }

  sendProduct(key, index) {
    this.productKey = key;
    this.index = index;
  }



  rateStars(num) {
    if (num == 1) {
      this.star1 = true;
      this.star2 = false;
      this.star3 = false;
      this.star4 = false;
      this.star5 = false;
    }
    if (num == 2) {
      this.star1 = true;
      this.star2 = true;
      this.star3 = false;
      this.star4 = false;
      this.star5 = false;
    }
    if (num == 3) {
      this.star1 = true;
      this.star2 = true;
      this.star3 = true;
      this.star4 = false;
      this.star5 = false;
    }
    if (num == 4) {
      this.star1 = true;
      this.star2 = true;
      this.star3 = true;
      this.star4 = true;
      this.star5 = false;
    }
    if (num == 5) {
      this.star1 = true;
      this.star2 = true;
      this.star3 = true;
      this.star4 = true;
      this.star5 = true;
    }
    this.rating = num;
  }


}

