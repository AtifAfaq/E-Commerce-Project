import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userType: string = '';
  public userLoggedIn: any = '';

  constructor(
    public service: DataCollectorService,
    public router: Router
  ) {
    this.userType = localStorage.getItem('userType') || 'buyer';
    this.userLoggedIn = localStorage.getItem('userLoggedIn');
  }

  ngOnInit() {

  }


  sellerMode() {
    if (localStorage.getItem('userLoggedIn') == 'true') {
      localStorage.setItem('userType', 'seller');
      this.router.navigate(['/seller-home']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  buyerMode() {
    localStorage.setItem('userType', 'buyer');
    this.router.navigate(['/home']);
  }

  signout() {
    var user = firebase.auth().currentUser;
    if (user) {
      firebase.auth().signOut()
        .then(() => {
          alert("User Logged Out!");
          localStorage.clear();
          this.service.getCartCount();
          this.router.navigate(['/login']);
          localStorage.setItem('userLoggedIn', 'false');
        })
        .catch((e) => {
          alert(e.message);
        })
    }
    else {
      localStorage.clear();
      this.service.getCartCount();
      localStorage.setItem('userLoggedIn', 'false');
      this.router.navigate(['/login']);
    }
  }

}
