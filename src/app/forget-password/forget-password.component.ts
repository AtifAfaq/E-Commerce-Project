import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  email: string = '';

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  resetPassword() {
    firebase.auth().sendPasswordResetEmail(this.email)
      .then(() => {
        alert("Email has been sent successfully!");
        this.router.navigate(['/login']);
      })
      .catch((e) => {
        alert(e.message);
      })
  }

}
