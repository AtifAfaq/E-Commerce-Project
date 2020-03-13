import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { DataCollectorService } from './../data-collector.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  categoriesData = [];
  productQty: number;
  allProducts: any = [];

  constructor(
    public router: Router,
    public service: DataCollectorService) {
    if (service.searchQuery) {
      this.getFilteredProducts();
    } else {
      this.categoriesData = this.service.categoriesData;
    }
  }

  ngOnInit() {
  }


  getFilteredProducts() {
    this.allProducts = this.service.allProducts;
    console.log(this.allProducts)
    for (var i = 0; i < this.allProducts.length; i++) {
      if (this.allProducts[i].productName.toLowerCase() == this.service.searchQuery.toLowerCase() || this.allProducts[i].productCategory.toLowerCase() == this.service.searchQuery.toLowerCase()) {
        this.categoriesData.push(this.allProducts[i])
      }
    }
    if (this.categoriesData.length == 0) {
      alert("No Product found")
      this.router.navigate(['/home']);
    }


  }


  getDiscount(product) {
    var disc = ((Number(product.originalPrice) - Number(product.discountedPrice)) / Number(product.originalPrice)) * 100;
    product.discount = disc;
    return disc;
  }


  AddCart(product) {
    if (product.availableQty >= 1) {
      product.productQty = this.productQty;
      this.service.product = product;
      this.service.AddtoCart(this.productQty);
    } else {
      alert("Product is not in stock")
    }
  }


}
