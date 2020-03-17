import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCollectorService } from '../data-collector.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userId: string = '';
  user: any = {};
  userImage: any = '';
  newFile: boolean = false;
  loading: boolean = false;
  uid;
  constructor(
    public router: ActivatedRoute,
    public route: Router,
    public service: DataCollectorService
  ) {

    this.uid = localStorage.getItem('uid')
    this.getUserDetail();

  }

  ngOnInit() {
  }
  getUserDetail() {
    var self = this;
    firebase.database().ref().child('users/' + self.uid)
      .once('value', (snapshot) => {
        self.user = snapshot.val();
        debugger;
        console.log(self.user)
      })
      .catch((e) => {
        alert(e.message);
      })
  }


  updateProfile() {
    this.loading = true;
    if (this.newFile) {
      this.uploadImage();
    }
    else {
      this.updateData();
    }
  }


  uploadImage() {
    var self = this;
    let storageRef = firebase.storage().ref();
    var metadata = {
      contentType: 'image/jpeg/png'
    };
    const filename = Math.floor(Date.now() / 1000);
    storageRef.child('profileImages/' + filename).put(self.userImage, metadata)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          debugger;
          snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              debugger;
              self.user.profileUrl = downloadURL;
              self.updateData();
            })
            .catch((e) => {
              alert(e.message);
              self.loading = false;
            })
        });
  }


  updateData() {
    var updates = {};
    updates['users/' + this.user.uid] = this.user;
    debugger;
    firebase.database().ref().update(updates)
      .then(() => {
        debugger;
        alert('Profile updated successfully!');
        this.loading = false;
        this.route.navigate[('/home')];
      })
      .catch((e) => {
        alert(e.message);
        this.loading = false;
      })
  }


  onChangeFile(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.userImage = files[0];  // Object of image containing image properties. for example name, size etc
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.user.profileUrl = reader.result;
      this.newFile = true;
    }
  }


}
