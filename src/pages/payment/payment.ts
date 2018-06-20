import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { BrowsePage } from '../browse/browse';
import { DonationsPage } from '../donations/donations';
import { StripeNativePage } from '../stripe-native/stripe-native';
import { StripeJavaScriptPage } from '../stripe-java-script/stripe-java-script';
 
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
      .subscribe(
        result => {
          let newUser = result.json().user;
          this.user = newUser;
        },
        error => {
          console.log(error);
        }
        
      );
    }
   
      // .post('/donations'), {
      //     amount: this.payment,
      //     date: this.
      // }
  
  openJavaScript(){
    this.navCtrl.push(StripeJavaScriptPage)
  }
  openNative(){
    this.navCtrl.push(StripeNativePage)
  }

  // createDonation() {
  //   var val = localStorage.getItem('jwt');
  //   this.jwt = val;

    


  // }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  navigateToPortfolio() {
    console.log(this.charity.id);
    console.log(this.user.id);
    this.http
      .post("http://localhost:3000/donation", {
        charity_id: this.charity.id,
        user_id: this.user.id,
        amount: this.payment,
        charity_name: this.charity.name,
        //donate_date: Date.now()
      })
      .subscribe(
        result => {
          console.log("whats going on")
          this.navCtrl.push(DonationsPage, {
              user: this.user
          });
        },

        error => {
          console.log(error);
        }
      );
  }

}
