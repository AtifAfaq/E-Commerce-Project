import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-prod-detail-seller',
  templateUrl: './prod-detail-seller.component.html',
  styleUrls: ['./prod-detail-seller.component.scss']
})
export class ProdDetailSellerComponent implements OnInit {

  productKey: string = '';
  product: any = {};


  constructor(
    public router: ActivatedRoute,
    public zone: NgZone
  ) {
    this.productKey = router.snapshot.params.key;

  }

  ngOnInit() {
    this.getProduct();
  }


  getProduct() {
    var self = this;
    firebase.database().ref().child('products/' + self.productKey)
      .once('value', (snapshot) => {
        self.product = snapshot.val();
        console.log(self.product);
      })
  }



}
