import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  myProducts: Array<any> = [];

  constructor(
    public router: Router
  ) {
    var userType = localStorage.getItem('userType');
    if (userType == 'buyer') {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.getMyProducts();
  }


  getMyProducts() {
    var self = this;
    let uid = localStorage.getItem('uid');
    firebase.database().ref().child('products')
      .orderByChild('uid').equalTo(uid)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.myProducts.push(temp);
        }
        console.log(self.myProducts);
      })
  }


  getDiscount(product) {
    return ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
  }


  productDetail(p) {
    this.router.navigate(['/prod-detail-seller/' + p.key]);

  }


}
