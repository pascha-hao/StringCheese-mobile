import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { BrowsePage } from '../browse/browse';
import { StripeNativePage } from '../stripe-native/stripe-native';
import { StripeJavaScriptPage } from '../stripe-java-script/stripe-java-script';
 
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    this.charity = this.navParams.get("charity");
  }
  openJavaScript(){
    this.navCtrl.push(StripeJavaScriptPage)
  }
  openNative(){
    this.navCtrl.push(StripeNativePage)
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
