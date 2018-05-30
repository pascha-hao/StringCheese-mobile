import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile'
import { RegisterPage } from '../register/register'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public username: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public address: string;
  public ccnum: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  
  ionViewDidLoad() {
    this.username = this.navParams.get("username");
    this.password = this.navParams.get("password");
    this.firstname = this.navParams.get("firstname");
    this.lastname = this.navParams.get("lastname");
    this.email = this.navParams.get("email");
    this.address = this.navParams.get("address");
    this.ccnum = this.navParams.get("ccnum");
  }

  navigateToLogin() {
    this.navCtrl.push(ProfilePage, {
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      address: this.address,
      ccnum: this.ccnum
    });
  }

  navigateToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
