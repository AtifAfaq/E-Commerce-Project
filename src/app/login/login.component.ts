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
  onLoginForm: FormGroup;
  email: string = '';
  password: string = '';
  uid: string = '';
  loading: boolean = false;

  constructor(public router: Router,
    public fb: FormBuilder) {
    if (localStorage.getItem('userLoggedIn') == 'true') {
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.onLoginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    })
  }


  userLogin() {
    this.loading = true;
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        if (user) {
          this.uid = firebase.auth().currentUser.uid;
          // if (firebase.auth().currentUser.emailVerified) {
          this.getUserData();
          // }
          // else {
          //   alert("Your account is not verified! Go to your email address and verify");
          //   firebase.auth().currentUser.sendEmailVerification();
          // }
        }
      })
      .catch((e) => {
        this.loading = false;
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
        this.loading = false;
        this.router.navigate(['/home']);
      })
      .catch((e) => {
        this.loading = false;
        alert(e.message);
      })
  }
}
