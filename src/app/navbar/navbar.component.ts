import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userType: string = '';

  constructor(
    public router: Router
  ) {
    // if there is no usertype then go to buyer
    this.userType = localStorage.getItem('userType') || 'buyer';
  }

  ngOnInit() {
  }

  sellerMode() {
    localStorage.setItem('userType', 'seller');
    this.router.navigate(['/seller-home']);
  }

  buyerMode() {
    localStorage.setItem('userType', 'buyer');
    this.router.navigate(['/home']);
  }

}
