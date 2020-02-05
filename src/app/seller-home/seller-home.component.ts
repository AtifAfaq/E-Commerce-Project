import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  myProducts: Array<any> = [];

  constructor(
    public service: DataCollectorService,
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
  Edit() {
    this.service.isEdit = true;
    this.router.navigate(["/add-product"])


  }

  getDiscount(product) {
    var disc = ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
    product.discount = disc;
    return disc;
  }


  productDetail(p) {
    this.service.product = p;
    debugger;
    // this.service.isEdit = true
    this.router.navigate(['/prod-detail-seller']);
    // this.router.navigate(['/prod-detail-seller/' + p.key]);
  }


}
