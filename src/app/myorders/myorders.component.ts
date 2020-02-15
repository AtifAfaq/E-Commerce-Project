import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from './../data-collector.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  myArray: any = [];
  order: number = 1;
  cartCount: any = 0;
  totalBill: any = 0;
  status = "pending";

  constructor(public router: Router,
    public service: DataCollectorService) {
    this.myArray = this.service.myArray;
    console.log(this.myArray)
    this.order = this.order++;
    this.cartCount = this.service.cartCount;
    this.totalBill = this.service.totalBill;
    this.status = "accepted"
  }

  ngOnInit() {
  }

}
