import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProdDetailSellerComponent } from './prod-detail-seller/prod-detail-seller.component';
import * as firebase from 'firebase';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DataCollectorService } from './data-collector.service';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyordersComponent } from './myorders/myorders.component';
import { DetailsComponent } from './details/details.component';
import { CountriesService } from './countries.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './search.pipe';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { AgmCoreModule } from '@agm/core';
import { NgxGeoautocompleteModule } from 'ngx-geoautocomplete';

var firebaseConfig = {
  apiKey: "AIzaSyDT97phJ84IgJ0Ye_GrZJChWRs44WJzni0",
  authDomain: "ecommerceproject-26041.firebaseapp.com",
  databaseURL: "https://ecommerceproject-26041.firebaseio.com",
  projectId: "ecommerceproject-26041",
  storageBucket: "ecommerceproject-26041.appspot.com",
  messagingSenderId: "1012121042557",
  appId: "1:1012121042557:web:ae1d219104e4dc7d2f3b14",
  measurementId: "G-MW7V09MP4P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    AllProductsComponent,
    ProductDetailsComponent,
    SellerHomeComponent,
    AddProductComponent,
    ProdDetailSellerComponent,
    ForgetPasswordComponent,
    CartComponent,
    CheckoutComponent,
    MyordersComponent,
    DetailsComponent,
    SearchPipe,
    SellerOrdersComponent,
    SellerDetailsComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxGeoautocompleteModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCb9lhLYxUnRjSp1oIGl6aAsXLODc3o-f4'
    }),
  ],
  providers: [
    DataCollectorService,
    CountriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
