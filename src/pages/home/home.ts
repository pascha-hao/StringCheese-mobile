import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.get('user')) {
      let user = this.navParams.get('user');
      //this.user.email = user.email;
      //this.user.password = user.password;
      this.user = user;
      this.user.id = 1;
    }
  }

  navigateToLogin() {
    this.navCtrl.push(ProfilePage, {
      user: this.user
    });
  }

  navigateToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
