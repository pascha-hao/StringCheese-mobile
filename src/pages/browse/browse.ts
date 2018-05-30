import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { ProfilePage } from '../profile/profile';

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
    items = [
      { name: "Good Charity", description: "It's a good one", story:"We're a charity that does some good stuff. Donate to us." },
      { name: "Fun Charity", description: "It's a fun one", story:"We're a charity that does some fun stuff. Donate to us." },
      { name: "Bad Charity", description: "It's a bad one", story:"We're a charity that does some bad stuff. Donate to us." },
      { name: "Other Charity", description: "It's an other one", story:"We're a charity that does some other stuff. Donate to us." }
    ];

    public username: string;
    public password: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public address: string;
    public ccnum: string;
    public name: string;
    public description: string;
    public story: string;

  itemSelected(item: object) {
    console.log("Selected Item", item);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToCharity(item) {
    this.navCtrl.push(CharityPage, {
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      address: this.address,
      ccnum: this.ccnum,
      name: item.name,
      description: item.description,
      story: item.story
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


}
