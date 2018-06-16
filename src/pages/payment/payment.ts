import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { BrowsePage } from '../browse/browse';
import { Http } from "@angular/http";
//import { DonationsPage } from '../donations/donations';
//import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  public user: User = new User();
  public charity: Charity = new Charity();
  public payment: number;
  jwt: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.user = this.navParams.get("user");
    this.charity = this.navParams.get("charity");
    this.jwt = localStorage.getItem('jwt')
    this.http 
    .get("http://localhost:3000/users", {
      params: {
        jwt: this.jwt
      }
    })
      // .post('/donations'), {
      //     amount: this.payment,
      //     date: this.
      // }
  }

  createDonation() {
    var val = localStorage.getItem('jwt');
    this.jwt = val;

    


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  navigateToBrowse() {
    this.navCtrl.push(BrowsePage, {
      user: this.user,
      payment: this.payment
    });
  }

}
