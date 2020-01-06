import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'; 
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  uid: string = '';
  constructor( public router : Router) {
    if (localStorage.getItem('userLoggedIn') == 'true') {
      router.navigate(['/home']);
   }}
  
  ngOnInit() {
  }
  userLogin() {
    // this.loading = true;
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        if (user) {
          this.uid = firebase.auth().currentUser.uid;
          this.getUserData();
        }
      })
      .catch((e) => {
        // this.loading = false;
        alert(e.message);
      })
  }


  getUserData() {
    firebase.database().ref().child('users/' + this.uid)
      .once('value', (snapshot) => {
        var user = snapshot.val();
        alert("You are successfully logged in!");
        localStorage.setItem('firstName', user.firstName);
        localStorage.setItem('lastName', user.lastName);
        localStorage.setItem('email', user.email);
        localStorage.setItem('uid', this.uid);
        localStorage.setItem('userLoggedIn', 'true');
        // this.loading = false;
        this.router.navigate(['/home']);
      })
      .catch((e) => {
        // this.loading = false;
        alert(e.message);
      })
  }
}
