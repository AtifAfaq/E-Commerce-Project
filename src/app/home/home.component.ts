import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories :any =[
    {name:"Pets", src:"/assets/images/cat1.jpg"}, 
    {name:"Rentals", src:"/assets/images/cat2.jpg"}, 
    {name:"Cloths", src:"/assets/images/cat3.jpg"}, 
    {name:"Shoes", src:"/assets/images/cat4.jpg"}, 
    {name:"Antiques", src:"/assets/images/cat5.jpg"}, 
    {name:"Appliances", src:"/assets/images/cat6.jpg"}, 
    {name:"Baby", src:"/assets/images/cat1.jpg"}, 
    {name:"Cables", src:"/assets/images/cat2.jpg"}, 
    {name:"Auto Parts", src:"/assets/images/cat1.jpg"}, 
    {name:"Milk Products", src:"/assets/images/cat1.jpg"}, 
    {name:"Balloons", src:"/assets/images/cat1.jpg"}, 
    {name:"Mobile Phones", src:"/assets/images/cat1.jpg"}, 
    {name:"Child Toys", src:"/assets/images/cat1.jpg"}, 
    {name:"Jackets", src:"/assets/images/cat1.jpg"},
    {name:"Vehicles", src:"/assets/images/cat1.jpg"},
    {name:"Furniture", src:"/assets/images/cat1.jpg"}];
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

  for (var key in catergories) {
    var user = catergories[key];
    this.allUsers.push(user);
  }

}
