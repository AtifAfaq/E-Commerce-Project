import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router
  ) {
    var userType = localStorage.getItem('userType');
    if (userType == 'seller') {
      router.navigate(['/seller-home']);
    }
    else {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
