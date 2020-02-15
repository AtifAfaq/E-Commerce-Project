import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from './../data-collector.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  uid: string = '';
  myArray = [];
  for = "";
  totalBill: any = 0;
  shipmentCharges: any = 0;
  loading: boolean = false;


  constructor(public service: DataCollectorService,
    public router: Router) {
    this.myArray = this.service.myArray;

    console.log(this.myArray)
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.totalBill = this.service.totalBill;
    this.shipmentCharges = this.service.shipmentCharges;
  }

  ngOnInit() {
  }
  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;

  }


  placeOrder() {
    var userData: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      uid: localStorage.getItem('uid'),
      myArray: this.myArray,
      timestamp: Number(new Date())
    }
    var updates = {};
    updates['/orders/' + this.uid] = userData;
    firebase.database().ref().update(updates)
      .then(() => {
        alert("Your order has been placed!");
        this.loading = false;
        this.service.myArray = this.myArray;
        this.router.navigate(["/myorders"]);

      })
      .catch((e) => {
        this.loading = false;
        alert(e.message);
      })
  }

}
