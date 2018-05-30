import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public username: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public address: string;
  public ccnum: string;

  constructor(public navCtrl: NavController) {
  }

  navigateToHome() {
    this.navCtrl.push(HomePage, {
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      address: this.address,
      ccnum: this.ccnum
    });
  }
}