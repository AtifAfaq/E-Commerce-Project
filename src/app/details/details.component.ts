import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCollectorService } from './../data-collector.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  myArray: any = [];
  allProducts = [];
  orderObj: any = {};
  comment: '';
  loading;
  productKey;
  constructor(public router: Router,
    public service: DataCollectorService) {

    this.orderObj = this.service.orderObj
    console.log(this.orderObj)

  }

  ngOnInit() {
  }


  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;
  }


  bringorder(i) {
    var self = this;
    firebase.database().ref().child('orders/' + self.myArray[i].key)
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allProducts.push(temp);
          console.log(this.allProducts)
        }
      })
  }

  reviewDataFirebase() {
    var review: any = {
      comment: this.comment,
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      uid: localStorage.getItem('uid'),
      productKey: this.productKey,
      timestamp: Number(new Date())
    }
    this.loading = true;
    var updates = {};
    var postKey = firebase.database().ref().child('reviews').push().key;
    updates['/reviews/' + postKey] = review;
    firebase.database().ref().update(updates)
      .then(() => {
        this.loading = false;
      })
      .catch((e) => {
        this.loading = false;
        alert(e.message);
      })
  }

  sendProduct(key) {
    this.productKey = key;
  }
  // updates['/users/' + this.uid] = userData;
  // firebase.database().ref().update(updates)
  //   .then(() => {
  //     alert("Your account has been successfully created!");
  //     localStorage.setItem('firstName', this.firstName);
  //     localStorage.setItem('lastName', this.lastName);
  //     localStorage.setItem('email', this.email);
  //     localStorage.setItem('uid', this.uid);
  //     localStorage.setItem('userLoggedIn', 'true');
  //     this.loading = false;
  //     firebase.auth().currentUser.sendEmailVerification();
  //     this.router.navigate(['/home']);
  //   })
  //   .catch((e) => {
  //     this.loading = false;
  //     alert(e.message);
  //   })


}

