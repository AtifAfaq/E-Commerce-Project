import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productQty: number = 1;

  constructor() { }

  ngOnInit() {
  }


  increaseValue() {
    this.productQty++;
  }


  decreaseValue() {
    if (this.productQty > 1) {
      this.productQty--;
    }
  }

}
