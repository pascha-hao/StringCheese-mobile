import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { User } from '../../models/user';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public user: User = new User();

  constructor(public navCtrl: NavController) {
  }

  navigateToHome() {
    this.navCtrl.push(HomePage, {
      user: this.user,
    });
  }
}