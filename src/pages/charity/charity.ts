import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CharityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-charity',
  templateUrl: 'charity.html',
})
export class CharityPage {

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
    this.name = this.navParams.get("name");
    this.description = this.navParams.get("description");
    this.story = this.navParams.get("story");
  }

}
