import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { ProfilePage } from '../profile/profile';
import { Charity } from '../../models/charityProfile';
import { User } from '../../models/user';
import { Http } from '@angular/http';

/**
 * Generated class for the BrowsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
  export class BrowsePage {

  public charities: Array<Charity> = [];
  public user: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.user = this.navParams.get("user");
    this.http
    .get("http://localhost:3000/charities")
    .subscribe(
      result => {
        let i=0;
        while(i<result.json().length){
          this.charities.push(result.json()[i]);
          i++;
        }
      },
      error => {
        console.log(error);
      }
    );
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowsePage');
  }

  navigateToCharity(charity: Charity) {
    this.navCtrl.push(CharityPage, {
      charity: charity,
      user: this.user
    });
  }

  navigateToProfile() {
    this.navCtrl.push(ProfilePage, {
      user: this.user
    });
  }

  navigateToBrowse(charity: Charity) {
    this.navCtrl.push(CharityPage, {
      charity: charity,
      user: this.user
    });
  }
}