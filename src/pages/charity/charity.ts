import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { MyCharity } from '../../models/myCharity';
import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { DonationsPage } from '../donations/donations';
import { PaymentPage } from '../payment/payment';
import { StripeJavaScriptPage } from '../stripe-java-script/stripe-java-script';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';
import { Project } from '../../models/project';
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
    public projects: Array<Project> = [];
    public charProjects: Array <Project> = [];
    public projectsExist: boolean;

    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public http: Http,
      public configService: ConfigService
    ) {
      this.charity = this.navParams.get("charity");
      this.user = this.navParams.get("user");
      this.http
        .get(this.configService.getBaseUrl() + "/projects")
        .subscribe(
          result => {
            let i = 0;
            while (i < result.json().length) {
              this.projects.push(result.json()[i]);
              i++;
            }
            for(let j=0; j<this.projects.length; j++) {
              if(this.projects[j].charity_id === this.charity.id) {
                this.charProjects.push(this.projects[j]);
              }
            }
            if(this.charProjects.length > 0){
              var exist = true;
            }
            else {
              var exist = false;
            }
            // if(!exist) {

            // }
          }, 
          error => {
            console.log(error);
          }
        )
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
