import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
    public star: string = "star-outline";
    public fav: boolean = false;
    jwt: string;

    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public http: Http,
      public configService: ConfigService,
      public toastCtrl: ToastController
    ) {
      this.charity = this.navParams.get("charity");
      this.user = this.navParams.get("user");
      this.jwt = localStorage.getItem('jwt')
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
            
            
            this.http
              .get(this.configService.getBaseUrl() + "/users", {
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

  favorite() {
    this.http
      .get(this.configService.getBaseUrl() + "/favorites?user_id=" + this.user.id + "&charity_id=" + this.charity.id, {
      })
      .subscribe(
        result => {
          console.log(result.json());
          var check = result.json().length;
          console.log(check)
          if (check == 0) {
            let toast = this.toastCtrl.create({
              message: 'Added to Favorites!',
              duration: 5000
            });
            toast.present();
            this.fav = true;
            this.http
              .post(this.configService.getBaseUrl() + "/favorite", {
                charity_id: this.charity.id,
                user_id: this.user.id,
              })
              .subscribe(
                result => {
                  console.log("happiness")
                },

                error => {
                  console.log(error);
                }
              );
          }
          else if (check != 0) {
            let toast = this.toastCtrl.create({
              message: 'Removed from Favorites!',
              duration: 5000
            });
            toast.present();
            this.fav = false;
            this.http
              .post(this.configService.getBaseUrl() + "/unfavorite?user_id=" + this.user.id + "&charity_id=" + this.charity.id, {
                charity_id: this.charity.id,
                user_id: this.user.id,
              })
              .subscribe(
                result => {
                  console.log("unhappiness")
                },
                error => {
                  console.log(error);
                }
              );
          }
        },
        error => {
          console.log(error);
        }
      );


  }

}