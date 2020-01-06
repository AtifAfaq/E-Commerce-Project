import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  contact: string = '';
  password: string = '';
  cPassword: string = '';
  uid: string = '';
  onRegisterForm: FormGroup;

  constructor(public router: Router) { }

  ngOnInit() {

  }

  registerUser() {
    if (this.password != this.cPassword) {
      alert("Passwords are not matched!");
      return;
    }
    // this.loading = true;
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.uid = firebase.auth().currentUser.uid;
        this.saveDataFirebase();
      })
      .catch((e) => {
        // this.loading = false;
        alert(e.message);
      })
  }


  saveDataFirebase() {
    var userData: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      contact: this.contact,
      uid: this.uid,
      timestamp: Number(new Date())
    }
    var updates = {};
    updates['/users/' + this.uid] = userData;
    firebase.database().ref().update(updates)
      .then(() => {
        alert("You are successfully logged in!");
        localStorage.setItem('firstName', this.firstName);
        localStorage.setItem('lastName', this.lastName);
        localStorage.setItem('email', this.email);
        localStorage.setItem('uid', this.uid);
        localStorage.setItem('userLoggedIn', 'true');
        // this.loading = false;
        firebase.auth().currentUser.sendEmailVerification();
        this.router.navigate(['/home']);
      })
      .catch((e) => {
        // this.loading = false;
        alert(e.message);
      })
  }

}
