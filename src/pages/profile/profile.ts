import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BrowsePage } from '../browse/browse';
import { DonationsPage } from '../donations/donations';
import { User } from '../../models/user';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public user: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App) {
    if (this.navParams.get('user')) {
      let user = this.navParams.get('user');
    }
  }

  navigateToHome() {
    localStorage.clear();
    this.app.getRootNav().setRoot(HomePage);
  }

  navigateToBrowse() {
    this.navCtrl.push(BrowsePage, {
      user: this.user,
    });
  }

  navigateToDonations() {
    this.navCtrl.push(DonationsPage, {
      user: this.user,
    });
  }

  navigateToProfile() {
    this.navCtrl.push(ProfilePage, {
      user: this.user,
    });
  }

}
