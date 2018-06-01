import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { ProfilePage } from '../profile/profile';
import { Charity } from '../../models/charityProfile';
import { User } from '../../models/user';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    // Instantiate a new Charity instance for Rhinos
    var charity1 = new Charity();
    charity1.id = 1;
    charity1.name = "Good Charity";
    charity1.slogan = "It's a good one!";
    charity1.about = "We're a charity that does some good stuff. Donate to us.";

    // Instantiate a new Charity instance for Dogs
    var charity2 = new Charity();
    charity2.id = 2;
    charity2.name = "Bad Charity";
    charity2.slogan = "It's a bad one!";
    charity2.about = "We're a charity that does some bad stuff. Donate to us.";

    // Instantiate a new Charity instance for Rhinos
    var charity3 = new Charity();
    charity3.id = 3;
    charity3.name = "Fun Charity";
    charity3.slogan = "It's a fun one!";
    charity3.about = "We're a charity that does some fun stuff. Donate to us.";

    // Instantiate a new Charity instance for Dogs
    var charity4 = new Charity();
    charity4.id = 4;
    charity4.name = "Other Charity";
    charity4.slogan = "It's an other one!";
    charity4.about = "We're a charity that does some other stuff. Donate to us.";

    // Add our 2 charity instances to our collection of charities
    this.charities.push(charity1);
    this.charities.push(charity2);
    this.charities.push(charity3);
    this.charities.push(charity4);
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