import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from './../data-collector.service';
import * as firebase from 'firebase';

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

  constructor(public service: DataCollectorService) {
    this.product = this.service.product
    console.log(this.product)
  }

  ngOnInit() {
    this.getMyReviews()
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

    debugger;
    firebase.database().ref().child('reviews')
      .orderByChild('productKey').equalTo(this.product.key)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var review = data[key];
          var myuid = review.uid;
          self.myReview.push(review);
        }
        console.log(self.myReview);
        self.loading = false;
        firebase.database().ref().child('users')
          .orderByChild('uid').equalTo(myuid)
          .once('value', (snapshot) => {
            var data = snapshot.val();

            for (var key in data) {
              var user = data[key];
              // temp.key = key;
              self.myReviewUser.push(user);
            }
            console.log(self.myReviewUser);
            self.loading = false;
          })
      })
  }

}
