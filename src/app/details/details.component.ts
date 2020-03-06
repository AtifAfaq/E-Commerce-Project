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
    var review: any = {
      comment: this.comment,
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      uid: localStorage.getItem('uid'),
      productKey: this.productKey,
      timestamp: Number(new Date())
    }
    this.loading = true;
    var updates = {};
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

  sendProduct(key) {
    this.productKey = key;
  }



  rateStars(index) {
    if (index == 1) {
      this.star1 = true;
      this.star2 = false;
      this.star3 = false;
      this.star4 = false;
      this.star5 = false;
    }
    if (index == 2) {
      this.star1 = true;
      this.star2 = true;
      this.star3 = false;
      this.star4 = false;
      this.star5 = false;
    }
    if (index == 3) {
      this.star1 = true;
      this.star2 = true;
      this.star3 = true;
      this.star4 = false;
      this.star5 = false;
    }
    if (index == 4) {
      this.star1 = true;
      this.star2 = true;
      this.star3 = true;
      this.star4 = true;
      this.star5 = false;
    }
    if (index == 5) {
      this.star1 = true;
      this.star2 = true;
      this.star3 = true;
      this.star4 = true;
      this.star5 = true;
    }
  }


}

