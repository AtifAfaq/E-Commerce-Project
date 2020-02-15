import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'eCommerceProject';

  onActivate(event) {
    window.scroll(0, 0);
  }


  // hello() {
  //   var self = this;
  //   for (var i = 0; i < self.myArray.length; i++) {
  //     firebase.database().ref().child('products/' + self.myArray[i].key)
  //       .once('value', (snapshot) => {
  //         var data = snapshot.val();
  //         data.availableQty = data.availableQty - self.array[i].qty;
  //         var updates = {};
  //         updates['/products/' + key + '/' + 'availableQty'] = data.availableQty;
  //         firebase.database().ref().update(updates)
  //           .then(() => {

  //           })
  //       })
  //   }
  // }


}
