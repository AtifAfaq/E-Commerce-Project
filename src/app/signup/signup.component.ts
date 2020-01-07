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

  onRegisterForm: FormGroup;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  contact: string = '';
  password: string = '';
  cPassword: string = '';
  uid: string = '';
  

  constructor(public fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.onRegisterForm = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required
      ])],
      contact: ['', Validators.compose([
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      cPassword: ['', Validators.compose([
        Validators.required
      ])],
    })

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
