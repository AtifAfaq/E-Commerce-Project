import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userType: string = '';
  public userLoggedIn: any = '';

  constructor(
    public router: Router
  ) {
    this.userType = localStorage.getItem('userType') || 'buyer';
    this.userLoggedIn = localStorage.getItem('userLoggedIn');
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
