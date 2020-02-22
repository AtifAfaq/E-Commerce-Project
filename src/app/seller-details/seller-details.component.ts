import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {
  key: string = '';
  order: any = {};
  orderProducts = [];
  loading = false;
  subTotal;
  shipmentCharges;
  totalBill;

  constructor(public router: ActivatedRoute) {
    this.key = router.snapshot.params.key;
    this.getUserDetail(this.key);
  }

  ngOnInit() {

  }
  getUserDetail(key) {
    firebase.database().ref().child('orders/' + key)
      .once('value', (snapshot) => {
        this.order = snapshot.val();
        this.order.myArray.forEach(product => {
          let uid = localStorage.getItem('uid');
          if (uid == product.uid) {
            this.orderProducts.push(product)
            console.log(this.orderProducts)

          }
        })
        this.getTotalCost()
      })
      .catch((e) => {
        alert(e.message);
      })

  }

  GrandTotal(p) {
    var totalPrice = Number(p.productQty) * Number(p.discountedPrice);
    return totalPrice;
  }


  getTotalCost() {
    this.subTotal = 0;
    this.shipmentCharges = 0;
    this.totalBill = 0;
    this.orderProducts.forEach(product => {
      this.subTotal = Number(this.subTotal) + Number(product.productQty) * Number(product.discountedPrice);
      this.shipmentCharges = Number(this.shipmentCharges) + Number(product.deliveryFee);
    });
    this.totalBill = this.subTotal + this.shipmentCharges;
  }


  accept(p) {
    p.status = "accepted";
    var updates = {};
    var postKey = firebase.database().ref().child('orders').push().key;
    debugger;
    updates['/orders/' + postKey] = p.status;
    firebase.database().ref().update(updates)
      .then(() => {
        alert("product accepted")
      })
      .catch((e) => {
        this.loading = false;
        alert(e.message);
      })
  }




  //   placeOrder() {
  //     var userData: any = {
  //       firstName: this.firstName,
  //       lastName: this.lastName,
  //       email: this.email,
  //       address: this.address,
  //       uid: localStorage.getItem('uid'),
  //       myArray: this.myArray,
  //       totalBill: this.totalBill,
  //       shipmentCharges: this.shipmentCharges,
  //       subTotal: this.subTotal,
  //       status: this.status,
  //       timestamp: Number(new Date())
  //     }
  //     var updates = {};
  //     var postKey = firebase.database().ref().child('orders').push().key;
  //     updates['/orders/' + postKey] = userData;
  //     firebase.database().ref().update(updates)
  //       .then(() => {
  //         for (var i = 0; i < this.myArray.length; i++) {
  //           this.zone.run(() => {
  //             this.updateQty(i);
  //           })
  //         }
  //       })
  //       .catch((e) => {
  //         this.loading = false;
  //         alert(e.message);
  //       })
  //   }


  //   updateQty(i) {
  //     var self = this;
  //     firebase.database().ref().child('products/' + self.myArray[i].key)
  //       .once('value', (snapshot) => {
  //         var data = snapshot.val();
  //         data.availableQty = Number(data.availableQty) - Number(self.myArray[i].productQty);
  //         var updates = {};
  //         updates['/products/' + self.myArray[i].key + '/' + 'availableQty'] = data.availableQty;
  //         firebase.database().ref().update(updates)
  //           .then(() => {
  //             if (i >= (this.myArray.length - 1)) {

  //               this.loading = false;
  //               var retreivedProducts = localStorage.getItem("products");
  //               this.myArray = JSON.parse(retreivedProducts);
  //               this.myArray = [];
  //               localStorage.setItem("products", JSON.stringify(this.myArray));
  //               this.totalBill = 0;
  //               localStorage.setItem("totalBill", JSON.stringify(this.totalBill));
  //               this.shipmentCharges = 0;
  //               localStorage.setItem("shipmentCharges", JSON.stringify(this.shipmentCharges));
  //               this.subTotal = 0;
  //               localStorage.setItem("subTotal", JSON.stringify(this.subTotal));
  //               this.service.getCartCount();
  //               alert("Your order has been placed!");
  //               this.router.navigate(['/myorders']);
  //             }
  //           })
  //       })
  //   }

  // }





}
