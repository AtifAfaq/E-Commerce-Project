import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    if (this.categoriesData.length == 0) {
      router.navigate(['/home']);
    }
  }


  ngOnInit() {
    this.service.getObservable().subscribe((data) => {
      this.getFilteredProducts();
    });
  }


  getFilteredProducts() {
    this.categoriesData = [];
    this.allProducts = this.service.allProducts;
    for (var i = 0; i < this.allProducts.length; i++) {
      var matched = this.allProducts[i].productName.toLowerCase().match(this.service.searchQuery.toLowerCase())
      if (matched || this.allProducts[i].productCategory.toLowerCase() == this.service.searchQuery.toLowerCase()) {
        this.categoriesData.push(this.allProducts[i])
      }
    }
    if (this.categoriesData.length == 0) {
      alert("No Product found")
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


  productDetails(p) {
    this.service.product = p;
    this.router.navigate(['/productDetails']);
  }

}
