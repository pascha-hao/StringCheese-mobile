import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { MyCharity } from '../../models/myCharity';
import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { DonationsPage } from '../donations/donations';
import { PaymentPage } from '../payment/payment';
import { StripeJavaScriptPage } from '../stripe-java-script/stripe-java-script';

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

    public user: User = new User();
    public charity: Charity = new Charity();


    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.charity = this.navParams.get("charity");
      this.user = this.navParams.get("user");
    }

  navigateToCharity(item) {
    this.navCtrl.push(CharityPage, {
      charity: this.charity,
      user: this.user
    });
  }

  // ionViewDidLoad() {
  //   this.user = this.navParams.get("user");
  //   this.charity = this.navParams.get("charity");
  // }

  navigateToDonations() {
    this.navCtrl.push(DonationsPage, {
      user: this.user,
      charity: this.charity,
    });
  }

  navigateToPayment() {
    this.navCtrl.push(StripeJavaScriptPage, {
      user: this.user,
      charity: this.charity,
    });
  }
}
