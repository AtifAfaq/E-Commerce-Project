import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  constructor(
    public router: Router
  ) {
    var userType = localStorage.getItem('userType');
    if (userType == 'seller') {
      router.navigate(['/seller-home']);
    }
  }


  ngOnInit() {

  }

}
