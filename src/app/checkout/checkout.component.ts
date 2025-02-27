import { Component, OnInit, NgZone } from '@angular/core';
import { DataCollectorService } from './../data-collector.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { CountriesService } from './../countries.service';
declare var google: any;



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
  country;
  state;
  city;
  paymentMethod;

  public lat: any;
  public lng: any;
  public userSettings: any;
  public locationAddress: any;

  constructor(public service: DataCollectorService,
    public countriesService: CountriesService,
    public router: Router,
    public zone: NgZone) {
    this.myArray = this.service.myArray;
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.totalBill = localStorage.getItem("totalBill");
    this.shipmentCharges = localStorage.getItem("shipmentCharges");
    this.subTotal = localStorage.getItem("subTotal");
    this.getCurrentLocation();

  }


  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.done();
      });
    }
  }


  done() {
    var self = this;
    let geocoder = new google.maps.Geocoder;
    let latlng = { lat: this.lat, lng: this.lng };
    geocoder.geocode({ 'location': latlng }, (results) => {
      if (results[0]) {
        self.userSettings = {
          inputPlaceholderText: results[0].formatted_address,
        };
        self.address = results[0].formatted_address;
        var parts = this.address.split(', ');
        self.country = parts[parts.length - 1];
        self.state = parts[parts.length - 2];
        self.city = parts[parts.length - 3];
      } else {
        console.log('No results found');
      }
    });
  }


  autoCompleteCallback1(selectedData: any) {
    var self = this;
    var Data = selectedData.data;
    console.log(Data);
    self.address = Data.description;
    var geometry = Data.geometry;
    var Location = geometry.location;
    self.lat = Location.lat;
    self.lng = Location.lng;
    var parts = this.address.split(', ');
    self.country = parts[parts.length - 1];
    self.state = parts[parts.length - 2];
    self.city = parts[parts.length - 3];
  }


  mapClicked(event) {
    var self = this;
    self.lat = event.coords.lat;
    self.lng = event.coords.lng;
    self.done();
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
    if (!this.manualCheckFields()) {
      return;
    }

    var userData: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      country: this.country,
      state: this.state,
      city: this.city,
      uid: localStorage.getItem('uid'),
      myArray: this.myArray,
      totalBill: this.totalBill,
      shipmentCharges: this.shipmentCharges,
      subTotal: this.subTotal,
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
            if (i >= (this.myArray.length - 1)) {

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
            }
          })
      })
  }



  manualCheckFields() {
    if (!this.address) {
      alert('Please Enter Address!');
      return false;
    }
    else if (!this.country) {
      alert('Please Enter Country!');
      return false;
    }
    else if (!this.state) {
      alert('Please Enter State!');
      return false;
    }
    else if (!this.city) {
      alert('Please Enter City!');
      return false;
    }

    else if (!this.paymentMethod) {
      alert('Please Enter PaymentMethod!');
      return false;
    }

    else {
      return true;
    }
  }

}
