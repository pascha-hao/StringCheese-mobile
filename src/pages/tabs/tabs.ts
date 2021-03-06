import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { BrowsePage } from '../browse/browse';
import { DonationsPage } from '../donations/donations';
import { TotalsPage } from '../totals/totals';
import { ProfilePage } from '../profile/profile';



@IonicPage()
@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs>
      <ion-tab tabIcon="compass" tabTitle="Browse" [root]="tab1"></ion-tab>
      <ion-tab tabIcon="stats" tabTitle="Donations" [root]="tab2"></ion-tab>
      <ion-tab tabIcon="star" tabTitle="Favorites" [root]="tab3"></ion-tab>
      <ion-tab tabIcon="person" tabTitle="Profile" [root]="tab4"></ion-tab>
    </ion-tabs>
  `

})
export class TabsPage {

  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = BrowsePage;
    this.tab2 = TotalsPage;
    this.tab3 = PaymentPage;
    this.tab4 = ProfilePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
