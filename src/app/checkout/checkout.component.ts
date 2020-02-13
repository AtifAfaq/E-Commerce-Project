import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from './../data-collector.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  myArray = [];
  subTotal: any = 0;
  shipmentCharges: any = 0;
  totalBill: any = 0;

  constructor(public service: DataCollectorService) {
    this.myArray = this.service.myArray;
    console.log(this.myArray)
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
  }

  ngOnInit() {
  }
  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;
  }
  getTotalCost() {
    this.subTotal = 0;
    this.shipmentCharges = 0;
    this.totalBill = 0;
    this.myArray.forEach(product => {
      this.subTotal = Number(this.subTotal) + Number(product.productQty) * Number(product.discountedPrice);
      this.shipmentCharges = Number(this.shipmentCharges) + Number(product.deliveryFee);
    });
    this.totalBill = this.subTotal + this.shipmentCharges;
  }

}
