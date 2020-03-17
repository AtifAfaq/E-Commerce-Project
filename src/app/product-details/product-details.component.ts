import { Component, OnInit, NgZone } from '@angular/core';
import { DataCollectorService } from './../data-collector.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productQty: number = 1;
  product: any = {}
  loading = false;
  myReview: any = [];
  myReviewUser: any = [];
  rate1 = 0;
  rate2 = 0;
  rate3 = 0;
  rate4 = 0;
  rate5 = 0;
  avgRating: any;


  constructor(
    public zone: NgZone,
    router: Router,
    public service: DataCollectorService) {
    this.product = this.service.product;
    if (!this.product.key) {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.getMyReviews();
  }


  increaseValue() {
    this.productQty++;
  }


  decreaseValue() {
    if (this.productQty > 1) {
      this.productQty--;
    }
  }


  getDiscount(product) {
    var disc = ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
    product.discount = disc;
    return disc;
  }


  AddCart(product) {
    if (product.availableQty >= 1) {
      product.productQty = this.productQty;
      this.service.product = product;
      this.service.AddtoCart(this.productQty);
    }
    else {
      alert("Product is not in stock")
    }
  }


  getMyReviews() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('reviews')
      .orderByChild('productKey').equalTo(self.product.key)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var review = data[key];
          self.getUserData(review);
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


  getUserData(review) {
    var self = this;
    firebase.database().ref().child('users')
      .orderByChild('uid').equalTo(review.uid)
      .once('value', (snapshot) => {
        self.zone.run(() => {
          var data = snapshot.val();
          for (var key in data) {
            var user = data[key];
            review.profileUrl = user.profileUrl || null;
            review.firstName = user.firstName;
            review.lastName = user.lastName;
            self.myReview.push(review);
          }
        })
      })
  }


  reviewCount() {
    debugger
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
  }

}
