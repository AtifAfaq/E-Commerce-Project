import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProdDetailSellerComponent } from './prod-detail-seller/prod-detail-seller.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyordersComponent } from './myorders/myorders.component';
import { DetailsComponent } from './details/details.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'allProducts', component: AllProductsComponent },
  { path: 'productDetails', component: ProductDetailsComponent },
  { path: 'seller-home', component: SellerHomeComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'prod-detail-seller', component: ProdDetailSellerComponent },
  { path: 'forget-Password', component: ForgetPasswordComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'myorders', component: MyordersComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'seller-orders', component: SellerOrdersComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(

    routes,
    { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
