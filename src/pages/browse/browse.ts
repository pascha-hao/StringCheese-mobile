import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { ProfilePage } from '../profile/profile';
import { Charity } from '../../models/charityProfile';
import { FormControl } from '@angular/forms';
import { User } from '../../models/user';
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
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage {

  public isSearchbarOpened = false;
  public searchText: string = '';
  public searchControl: FormControl;
  public charities: Array<Charity> = [];
  public user: User = new User();
  public searching: any = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public charityService: CharityServiceProvider,
    public configService: ConfigService) {
    this.searchControl = new FormControl();
    this.user = this.navParams.get("user");
    this.http
      .get(this.configService.getBaseUrl() + "/charities")
      .subscribe(
        result => {
          let i = 0;
          while (i < result.json().length) {
            this.charities.push(result.json()[i]);
            i++;
          }
        },
        error => {
          console.log(error);
        }
      );


  }

  // search() {
  //   this.charityService.getFilteredCharites(this.searchText)
  //     .subscribe(filteredCharities => {
  //       this.charities = filteredCharities;
  //     });
  // }

  ionViewDidLoad() {
    this.setFilteredCharities();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredCharities();

    });

    console.log('ionViewDidLoad BrowsePage');
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredCharities() {
    this.charities = this.charityService.filterCharities(this.searchText);
  }


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