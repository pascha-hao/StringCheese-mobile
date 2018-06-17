import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";

import { HomePage } from '../home/home';
import { User } from '../../models/user';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public user: User = new User();
  public confirmed: string;

  constructor(public navCtrl: NavController, public http: Http) {
  }

  register() {
    if (this.user.password != this.confirmed) {
      alert('Passwords do not match.')
    }
    else {
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
            this.navCtrl.setRoot(HomePage, {
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
}