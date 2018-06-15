import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { User } from '../../models/user';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public user: User = new User();

  constructor(public navCtrl: NavController, public http: Http) {
  }

  navigateToHome() {
    this.navCtrl.push(HomePage, {
      user: this.user,
    });
  }

  register() {
    this.http
      .post("http://localhost:3000/register", {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        password: this.user.password
      })
      .subscribe(
        result => {
          let token = result.json().token;
          console.log(token)
          // Our username and password (on this) should have data from the user
          this.navCtrl.push(HomePage, {
              user: this.user,
              token,
          });
        },

        error => {
          console.log(error);
        }
      );
  }
}