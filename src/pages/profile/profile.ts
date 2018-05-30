import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BrowsePage } from '../browse/browse';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public username: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public address: string;
  public ccnum: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

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

  ionViewDidLoad() {
    this.username = this.navParams.get("username");
    this.password = this.navParams.get("password");
    this.firstname = this.navParams.get("firstname");
    this.lastname = this.navParams.get("lastname");
    this.email = this.navParams.get("email");
    this.address = this.navParams.get("address");
    this.ccnum = this.navParams.get("ccnum");
  }

  navigateToBrowse() {
    this.navCtrl.push(BrowsePage, {
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
