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
  myReview: any = [];
  rate1 = 0;
  rate2 = 0;
  rate3 = 0;
  rate4 = 0;
  rate5 = 0;
  avgRating: any;

  ratingBtns: any = [
    { value: 1, status: false },
    { value: 2, status: false },
    { value: 3, status: false },
    { value: 4, status: false },
    { value: 5, status: false },
  ]

  // star1: boolean = false;
  // star2: boolean = false;
  // star3: boolean = false;
  // star4: boolean = false;
  // star5: boolean = false;

  constructor(public router: Router,
    public service: DataCollectorService) {
    this.orderObj = this.service.orderObj;
    if (!this.orderObj.key) {
      router.navigate(['/myorders']);
    }
  }

  ngOnInit() {
  }


  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;
  }


  reviewDataFirebase() {
    var self = this;
    this.loading = true;
    var review: any = {
      comment: self.comment,
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      uid: localStorage.getItem('uid'),
      productKey: self.productKey,
      rating: self.rating,
      orderId: self.orderObj.key,
      timestamp: Number(new Date())
    }
    var updates = {};
    self.orderObj.myArray[self.index].review = true;
    updates['/orders/' + this.orderObj.key + '/myArray'] = self.orderObj.myArray;
    firebase.database().ref().update(updates).then(() => {

    })
    var postKey = firebase.database().ref().child('reviews').push().key;
    updates['/reviews/' + postKey] = review;
    firebase.database().ref().update(updates)
      .then(() => {
        self.loading = false;
        this.postProductReview();
        alert("Review submitted successfully!");
      })
      .catch((e) => {
        self.loading = false;
        alert(e.message);
      })
  }

  postProductReview() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('reviews')
      .orderByChild('productKey').equalTo(self.productKey)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          debugger;
          var review = data[key];
          self.myReview.push(review);
        }
        self.loading = false;
        setTimeout(() => {
          self.reviewCount();
        }, 2000);
      })
      .catch((e) => {
        self.loading = false;
        alert(e.message);
      })
  }

  reviewCount() {
    for (var i = 0; i < this.myReview.length; i++) {
      var rate = this.myReview[i].rating;
      if (rate == 1) {
        this.rate1++;
      }
      else if (rate == 2) {
        this.rate2++;
      }
      else if (rate == 3) {
        this.rate3++;
      }
      else if (rate == 4) {
        this.rate4++;
      }
      else if (rate == 5) {
        this.rate5++;
      }
    }
    this.avgRating = ((this.rate1) * 1 + (this.rate2) * 2 + (this.rate3) * 3 + (this.rate4) * 4 + (this.rate5) * 5) / this.myReview.length;

    debugger;
    
    var updates = {};

    updates['/products/' + this.productKey + "/avgRating"] = this.avgRating;
    updates['/products/' + this.productKey + "/totalReview"] = this.myReview.length;
    firebase.database().ref().update(updates).then(() => {

    })

  }

  sendProduct(key, index) {
    this.productKey = key;
    this.index = index;
  }


  rateStars(value) {
    for (var i = 0; i < this.ratingBtns.length; i++) {
      if (this.ratingBtns[i].value <= value) {
        this.ratingBtns[i].status = true;
      } else {
        this.ratingBtns[i].status = false;
      }
    }
    this.rating = value;
  }



  // rateStars(num) {
  //   if (num == 1) {
  //     this.star1 = true;
  //     this.star2 = false;
  //     this.star3 = false;
  //     this.star4 = false;
  //     this.star5 = false;
  //   }
  //   if (num == 2) {
  //     this.star1 = true;
  //     this.star2 = true;
  //     this.star3 = false;
  //     this.star4 = false;
  //     this.star5 = false;
  //   }
  //   if (num == 3) {
  //     this.star1 = true;
  //     this.star2 = true;
  //     this.star3 = true;
  //     this.star4 = false;
  //     this.star5 = false;
  //   }
  //   if (num == 4) {
  //     this.star1 = true;
  //     this.star2 = true;
  //     this.star3 = true;
  //     this.star4 = true;
  //     this.star5 = false;
  //   }
  //   if (num == 5) {
  //     this.star1 = true;
  //     this.star2 = true;
  //     this.star3 = true;
  //     this.star4 = true;
  //     this.star5 = true;
  //   }
  //   this.rating = num;
  // }


}

