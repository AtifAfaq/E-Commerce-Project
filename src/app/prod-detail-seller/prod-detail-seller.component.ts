import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';
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
    public service: DataCollectorService,
    public zone: NgZone
  ) {
    this.product = service.product;
    // this.productKey = router.snapshot.params.key;
  }

  ngOnInit() {
    // this.getProduct();
  }


  getProduct() {
    var self = this;
    firebase.database().ref().child('products/' + self.productKey)
      .once('value', (snapshot) => {
        self.product = snapshot.val();
        // self.product.discount = ((Number(self.product.originalPrice) - Number(self.product.discountedPrice)) / Number(self.product.originalPrice)) * 100;
        console.log(self.product);
      })
  }



}
