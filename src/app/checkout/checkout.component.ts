import { Component, OnInit, NgZone } from '@angular/core';
import { DataCollectorService } from './../data-collector.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { CountriesService } from './../countries.service';

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
  totalBill: any = 0;
  shipmentCharges: any = 0;
  subTotal: any = 0;
  loading: boolean = false;
  cartCount = this.service.cartCount
  countries;
  states;
  status = "pending";

  constructor(public service: DataCollectorService,
    public countriesService: CountriesService,
    public router: Router,
    public zone: NgZone) {
    this.myArray = this.service.myArray;

    console.log(this.myArray)
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.totalBill = localStorage.getItem("totalBill");
    this.shipmentCharges = localStorage.getItem("shipmentCharges");
    this.subTotal = localStorage.getItem("subTotal");
  }


  ngOnInit() {
    this.countries = this.countriesService.getCountries();
  }


  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;

  }
  selectStatesBasedOnCountry(countryId) {
    this.states = this.countriesService.getStates(countryId);
  }



  placeOrder() {
    var userData: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      uid: localStorage.getItem('uid'),
      myArray: this.myArray,
      totalBill: this.totalBill,
      shipmentCharges: this.shipmentCharges,
      subTotal: this.subTotal,
      status: this.status,
      timestamp: Number(new Date())
    }
    var updates = {};
    var postKey = firebase.database().ref().child('orders').push().key;
    updates['/orders/' + postKey] = userData;
    firebase.database().ref().update(updates)
      .then(() => {
        for (var i = 0; i < this.myArray.length; i++) {
          this.zone.run(() => {
            this.updateQty(i);
          })
        }
      })
      .catch((e) => {
        this.loading = false;
        alert(e.message);
      })
  }


  updateQty(i) {
    var self = this;
    firebase.database().ref().child('products/' + self.myArray[i].key)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        data.availableQty = Number(data.availableQty) - Number(self.myArray[i].productQty);
        var updates = {};
        updates['/products/' + self.myArray[i].key + '/' + 'availableQty'] = data.availableQty;
        firebase.database().ref().update(updates)
          .then(() => {
            this.loading = false;
            var retreivedProducts = localStorage.getItem("products");
            this.myArray = JSON.parse(retreivedProducts);
            this.myArray = [];
            localStorage.setItem("products", JSON.stringify(this.myArray));
            this.totalBill = 0;
            localStorage.setItem("totalBill", JSON.stringify(this.totalBill));
            this.shipmentCharges = 0;
            localStorage.setItem("shipmentCharges", JSON.stringify(this.shipmentCharges));
            this.subTotal = 0;
            localStorage.setItem("subTotal", JSON.stringify(this.subTotal));
            this.service.getCartCount();
            alert("Your order has been placed!");
            this.router.navigate(['/myorders']);
          })
      })
  }

}
