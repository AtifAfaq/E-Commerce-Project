import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase'; 

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  onAddProduct: FormGroup;
  productName: string = '';
  productCat: string = '';
  availableQty: string = '';
  brand: string = '';
  deliveryTime: string = '';
  productDes: string = '';
  productSpec: string = '';
  originalPrice: string = '';
  discountedPrice: string = '';
  deliveryFee: string = '';
  warrantyPolicy: string = '';

  imagePath: any = {};
  imgURL: any = '';
  message: any = '';

  catergories: any = ["Pets", "Rentals", "Cloths", "Shoes", "Antiques", "Appliances", "Auto Parts", "Baby", "Cables", "Milk Products", "Balloons", "Mobile Phones", "Child Toys", "Jackets", "Vehicles", "Furniture"];

  constructor(public fb: FormBuilder,
    public router: Router) { }

  ngOnInit() {
    this.onAddProduct = this.fb.group({
      productName: ['', Validators.compose([
        Validators.required
      ])],
      productCat: ['', Validators.compose([
        Validators.required
      ])],
      availableQty: ['', Validators.compose([
        Validators.required
      ])],
      brand: ['', Validators.compose([
        Validators.required
      ])],
      deliveryTime: ['', Validators.compose([
        Validators.required
      ])],
      productDes: ['', Validators.compose([
        Validators.required
      ])],
      productSpec: ['', Validators.compose([
        Validators.required
      ])],
      originalPrice: ['', Validators.compose([
        Validators.required
      ])],
      discountedPrice: ['', Validators.compose([
        Validators.required
      ])],
      deliveryFee: ['', Validators.compose([
        Validators.required
      ])],
      warrantyPolicy: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  preview(files) {
    this.message = "";
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;  // Object used to save on firebase storage (imageName, size, location etc)
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;   // Url to be used for preview display (string format)
    }
  }

}
