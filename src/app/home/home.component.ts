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
  v = {};
  productQty: number;
  loading: boolean = false;
  categoriesData = [];
  Currentproduct: any = {};
  activeIndex: any;
  categories: any = [];
  featuredProducts = [];

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
    public service: DataCollectorService,
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
    this.getallCategories();
    this.getAllFeaturedProducts();
  }

  getAllFeaturedProducts() {
    var self = this;
    this.loading = true;
    firebase.database().ref().child('featuredProducts')
      .on('child_added', (snapshot) => {
        var data = snapshot.val();
        data.key = snapshot.key;
        self.featuredProducts.push(data)
        console.log(self.featuredProducts)
      })
  }

  getAllProducts() {
    var self = this;
    this.loading = true;
    firebase.database().ref().child('products')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allProducts.push(temp);
        }
        self.service.allProducts = self.allProducts;
        self.loading = false;
      })
  }

  getallCategories() {
    var self = this;
    firebase.database().ref().child('categories')
      .on('child_added', (snapshot) => {
        var data = snapshot.val();
        data.key = snapshot.key;
        self.categories.push(data)

      })
  }


  productDetails(p) {
    this.service.product = p;
    this.router.navigate(['/productDetails']);
  }


  getDiscount(product) {
    var disc = ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
    product.discount = disc;
    return disc;
  }


  AddCart(p, i) {
    var uid = localStorage.getItem("uid");
    if (uid == p.uid) {
      alert("You cannot purchase your own product")
      return
    }
    if (p.availableQty >= 1) {
      p.productQty = 1
      this.service.product = p;
      this.Currentproduct = p;
      this.activeIndex = i;
      this.service.AddtoCart(1);
    }
    else {
      alert("Product is not in stock")
    }
  }


  bringCategories(v) {
    this.allProducts.forEach(product => {
      if (product.productCategory == v.name) {
        this.categoriesData.push(product)
        console.log(this.categoriesData)
        this.service.categoriesData = this.categoriesData
        this.router.navigate(['/allProducts'])
      }
    });
  }


}
