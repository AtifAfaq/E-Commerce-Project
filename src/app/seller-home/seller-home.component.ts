import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  constructor(
    public router: Router
  ) {
    var userType = localStorage.getItem('userType');
    if (userType == 'buyer') {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
