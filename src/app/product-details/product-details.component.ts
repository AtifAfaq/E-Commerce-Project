import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from './../data-collector.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productQty: number = 1;
  product: any = {}

  constructor(public service: DataCollectorService) {
    this.product = this.service.product
    debugger;
  }

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
