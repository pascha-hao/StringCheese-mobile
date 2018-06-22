import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { ProfilePage } from '../profile/profile';
import { Charity } from '../../models/charityProfile';
import { FormControl } from '@angular/forms';
import { User } from '../../models/user';
import { MyFavs } from '../../models/myfavs';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';
import { CharityServiceProvider } from '../../charity.service'
import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the BrowsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  public isSearchbarOpened = false;
  public searchText: string = '';
  public searchControl: FormControl;
  public tempcharities: Array<Charity> = [];
  public charities: Array<Charity> = [];
  public user: User = new User();
  public searching: any = false;
  public myfavs: Array<MyFavs> = [];
  public charityids: Array<number> = [];
  jwt: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public charityService: CharityServiceProvider,
    public configService: ConfigService) {
    this.searchControl = new FormControl();
    this.jwt = localStorage.getItem('jwt')

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
          this.http

            .get(this.configService.getBaseUrl() + "/myfavorites?user_id=" + this.user.id, {
            })
            .subscribe(
              result => {
                this.myfavs = result.json();
                for (var i = 0; i < this.myfavs.length; i++) {
                  this.charityids.push(this.myfavs[i].charity_id)
                }
                this.http
                  .get(this.configService.getBaseUrl() + "/charities")
                  .subscribe(
                    result => {
                      let i = 0;
                      while (i < result.json().length) {
                        this.tempcharities.push(result.json()[i]);
                        i++;
                      }
                      for (var j = 0; j < this.charityids.length; j++) {
                        if (this.tempcharities[j].id == this.charityids[j]) {
                          this.charities.push(this.tempcharities[j]);
                        }
                      }
                    },
                    error => {
                      console.log(error);
                    }
                  );
              },
              error => {
                console.log(error);
              }
            );
        },
        error => {
          console.log(error);
        }
      );
  }


  ionViewDidLoad() {
    //this.setFilteredCharities();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      //this.setFilteredCharities();

    });

    console.log('ionViewDidLoad BrowsePage');
  }

  onSearchInput() {
    this.searching = true;
  }

  // setFilteredCharities() {
  //   this.charities = this.charityService.filterCharities(this.searchText);
  // }


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