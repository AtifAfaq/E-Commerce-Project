import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  imagePath: any = {};
  imgURL: any = '';
  message: any = '';

  catergories: any = ["Pets", "Rentals", "Cloths", "Shoes", "Antiques", "Appliances", "Auto Parts", "Baby", "Cables", "Milk Products", "Balloons", "Mobile Phones", "Child Toys", "Jackets", "Vehicles", "Furniture"];

  constructor() { }

  ngOnInit() {
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
