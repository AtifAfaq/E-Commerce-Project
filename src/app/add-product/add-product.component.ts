import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { DataCollectorService } from '../data-collector.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  onAddProduct: FormGroup;
  isEdit = false;

  product: any = {
    productName: '',
    productCategory: 'Please select your product category',
    availableQty: '',
    brand: '',
    deliveryFee: '',
    productDes: '',
    productSpecs: [],
    originalPrice: '',
    discountedPrice: '',
    deliveryTime: '2-5 days',
    warrantyPolicy: '',
    productUrls: []
  };

  productSpec: string = '';
  imagePaths: any = [];
  imageUrls: any = [];
  message: any = '';
  loading: boolean = false;
  imageCount: any;

  catergories: any = ["Pets", "Rentals", "Cloths", "Shoes", "Antiques", "Appliances", "Auto Parts", "Baby", "Cables", "Milk Products", "Balloons", "Mobile Phones", "Child Toys", "Jackets", "Vehicles", "Furniture"];

  constructor(
    public fb: FormBuilder,
    public zone: NgZone,
    public router: Router,
    public service: DataCollectorService) {
    this.populateData();
  }


  populateData() {
    this.isEdit = this.service.isEdit;
    if (this.isEdit == true) {
      this.product = this.service.product;
      this.imageUrls = this.service.product.productUrls;
    }
  }


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
    if (this.productSpec != '') {
      this.product.productSpecs.push(this.productSpec);
      this.productSpec = '';
    }
  }


  removeSpec(index) {
    this.product.productSpecs.splice(index, 1);
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
    this.uploadImageMethod();
  }


  uploadImageMethod() {
    this.imageCount = this.imagePaths.length;
    for (var i = 0; i < this.imagePaths.length; i++) {
      this.zone.run(() => {
        this.uploadImage(this.imagePaths[i]);
      })
    }
  }


  uploadImage(image) {
    var self = this;
    let storageRef = firebase.storage().ref();
    var metadata = {
      contentType: 'image/jpeg/png'
    };
    const filename = Math.floor(Date.now() / 1000) + image.name;
    storageRef.child('productImages/' + filename).put(image, metadata)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              self.product.productUrls.push(downloadURL);
              self.imageCount--;
              if (self.imageCount == 0) {
                self.updateData();
              }
            })
            .catch((e) => {
              console.log(e.message);
              self.loading = false;
            })
        });
  }


  updateData() {
    this.product.uid = localStorage.getItem('uid');
    this.product.timestamp = Number(new Date());

    var postKey = firebase.database().ref().child('products').push().key;
    var updates = {};
    updates['/products/' + postKey] = this.product;
    firebase.database().ref().update(updates)
      .then(() => {
        this.loading = false;
        alert('Product added successfully!');
        this.router.navigate(['/seller-home']);
      })
      .catch((e) => {
        this.loading = false;
        alert(e.message);
      })
  }



  updateProduct() {
    var key = this.product.key;
    delete this.product.key;
    delete this.product.discount;
    var updates = {};
    updates['/products/' + key] = this.product;
    firebase.database().ref().update(updates)
      .then(() => {
        alert('Product updated successfully!');
        this.router.navigate(['/seller-home']);
      })
  }


  manualCheckFields() {
    if (this.product.productCat == 'Please select your product category') {
      alert('Please select your product category!');
      return false;
    }
    else if ((this.product.productSpecs.length) < 3) {
      alert('Please add atleast 3 features!');
      return false;
    }
    else if ((this.imageUrls.length) < 3) {
      alert('Please add atleast 3 images!');
      return false;
    }
    else {
      return true;
    }
  }

}
