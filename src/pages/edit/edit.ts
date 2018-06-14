import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from "@angular/http";

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { User } from '../../models/user';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  public user: User = new User();

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
    this.user = this.navParams.get("user");
  }

  navigateToHome() {
    this.navCtrl.push(HomePage, {
      user: this.user,
    });
  }

  edit() {
    this.http
      .post("http://localhost:3000/register", {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        password: this.user.password
      })
      .subscribe(
        result => {
          console.log(result);

          // Our username and password (on this) should have data from the user
          this.navCtrl.push(HomePage, {});
        },

        error => {
          console.log(error);
        }
      );
  }
}