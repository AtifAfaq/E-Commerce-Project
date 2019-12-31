import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
value:number;
  constructor() { }

  ngOnInit() {
  }
  increaseValue() {
    // var value = parseInt(document.getElementById('number').value, 10);
    // value = isNaN(value) ? 0 : value;
    // value++;
    // document.getElementById('number').value = value;
  }
decreaseValue() {
    // var value = parseInt(document.getElementById('number').value, 10);
    // value = isNaN(value) ? 0 : value;
    // value < 1 ? value = 1 : '';
    // value--;
    // document.getElementById('number').value = value;
  }

}
