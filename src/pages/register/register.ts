import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";

import { HomePage } from '../home/home';
import { User } from '../../models/user';
import { ConfigService } from '../../config.service';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public user: User = new User();
  public confirmed: string;
  public users: Array<User> = [];

  constructor(
    public navCtrl: NavController, 
    public http: Http, 
    public configService: ConfigService, 
    public toastCtrl: ToastController,) {
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }



  register() {
    if (this.user.password != this.confirmed) {
      let toast = this.toastCtrl.create({
        message: 'Passwords Do Not Match!',
        duration: 3000
      });
      toast.present();
    }
    else if (!this.validateEmail(this.user.email)) {
      let toast = this.toastCtrl.create({
        message: 'Invalid Email Address!',
        duration: 3000
      });
      toast.present();
    }

    else {
      this.http
        .post(this.configService.getBaseUrl() + "/register", {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          password: this.user.password
        })
        .subscribe(
          result => {
            let token = result.json().token;
            console.log(token)
            localStorage.setItem("jwt", token);
            // Our username and password (on this) should have data from the user
            this.navCtrl.setRoot(HomePage, {
              user: this.user,
              token,
            });
          },
          error => {
            let toast = this.toastCtrl.create({
              message: 'Email Address is Already Registered!',
              duration: 3000
            });
            toast.present();
          }      
      );
  }
}
}