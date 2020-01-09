import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  onAddProduct: FormGroup;
  productName: string = '';
  productCat: string = 'Please select your product category';
  availableQty: string = '';
  brand: string = '';
  deliveryTime: string = '2-5 days';
  productDes: string = '';
  productSpec: string = '';
  productSpecs: any = [];
  originalPrice: string = '';
  discountedPrice: string = '';
  deliveryFee: string = '';
  warrantyPolicy: string = '';
  imagePaths: any = [];
  imageUrls: any = [];
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



  addFeature() {
    this.productSpecs.push(this.productSpec);
    // to reset the feature tab
    this.productSpec = '';
  }


  removeSpec(index) {
    this.productSpecs.splice(index, 1);
  }

  removeImg(index) {
    this.imageUrls.splice(index, 1);
  }
  // SELECT MULTIPLE AND CREATE URLS

  onChangeFiles(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    for (var i = 0; i < files.length; i++) {
      this.imagePaths[i] = files[i];
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrls.push(e.target.result);
      }
      reader.readAsDataURL(files[i]);
    }
  }



  addProduct() {
    if (!this.manualCheckFields()) {
      return;
    }
  }



  manualCheckFields() {
    if (this.productCat == 'Please select your product category') {
      alert('Please select your product category!');
    }
    if ((this.productSpecs.length) < 3) {
      alert('Please add atleast 3 features!');
     
    }
    if ((this.imageUrls.length) < 3) {
      alert('Please add atleast 3 images!');
      
    }

    return false;
  }



}
