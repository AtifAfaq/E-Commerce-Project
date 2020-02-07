import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { DataCollectorService } from './../data-collector.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allProducts = [];
  productQty: number = 1;
  loading: boolean = false;
  categories: any = [
    { name: "Pets", src: "/assets/images/pets.png" },
    { name: "Rentals", src: "/assets/images/rent.jpg" },
    { name: "Cloths", src: "/assets/images/cloths.jpg" },
    { name: "Shoes", src: "/assets/images/shoes.jpg" },
    { name: "Antiques", src: "/assets/images/antiques.jpg" },
    { name: "Appliances", src: "/assets/images/appliances.png" },
    { name: "Baby Food", src: "/assets/images/babyfood.jpg" },
    { name: "Cables", src: "/assets/images/cable.jpeg" },
    { name: "Auto Parts", src: "/assets/images/auto.jpg" },
    { name: "Milk Products", src: "/assets/images/milk.jpg" },
    { name: "Balloons", src: "/assets/images/baloons.jpg" },
    { name: "Mobile Phones", src: "/assets/images/mobile.jpg" },
    { name: "Child Toys", src: "/assets/images/toys.jpg" },
    { name: "Jackets", src: "/assets/images/jackets.jpg" },
    { name: "Vehicles", src: "/assets/images/vehicles.jpg" },
    { name: "Furniture", src: "/assets/images/furniture.jpg" }
  ];

  persons: any = [
    {
      id: 1,
      name: 'Alex Smith',
      contact: '1234567890',
      address: {
        street: '123 Main Street',
        city: 'Anytown',
        state: 'California',
        region: 'West'
      },
      interests: [
        {
          id: 1,
          name: 'john Doe'
        },
        {
          id: 2,
          name: 'Sam Doe'
        },
        {
          id: 3,
          name: 'Danny Doe'
        },
      ]
    },
    {
      id: 2,
      name: 'Marrie Smith',
      contact: '1234567890',
      address: {
        street: '123 Main Street',
        city: 'Anytown',
        state: 'California',
        region: 'West'
      },
      interests: [
        {
          id: 1,
          name: 'john Doe'
        },
        {
          id: 2,
          name: 'Sam Doe'
        },
        {
          id: 3,
          name: 'Danny Doe'
        },
      ]
    },
  ];

  constructor(
    public router: Router,
    public service: DataCollectorService
  ) {
    var userType = localStorage.getItem('userType');
    if (userType == 'seller') {
      router.navigate(['/seller-home']);
    }
  }


  ngOnInit() {
    //   setTimeout(() => {
    //     localStorage.setItem('myArray', JSON.stringify(this.persons));
    //   }, 5000);
    //   // debugger;
    //   var myArray = localStorage.getItem('myArray');
    //   this.persons = JSON.parse(myArray);
    // }
    // debugger;

    // updateName(mainInd, index) {
    //   this.persons[mainInd].interests[index].name = 'Atif';
    // }
    this.getAllProducts();
  }
  getAllProducts() {
    var self = this;
    this.loading = true;
    let uid = localStorage.getItem('uid');
    firebase.database().ref().child('products')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allProducts.push(temp);
        }
        console.log(self.allProducts);
        this.loading = false;
      })

  }

  productDetails(p) {
    this.service.product = p;
    debugger;
    this.router.navigate(['/productDetails']);
  }


  AddCart(p) {
    p.productQty = 1
    this.service.product = p;
    debugger;
    this.service.AddtoCart();
  }


}
