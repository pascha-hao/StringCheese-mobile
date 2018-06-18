import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { ProfilePage } from '../profile/profile';
import { Charity } from '../../models/charityProfile';
import { User } from '../../models/user';

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

  public isSearchbarOpened= false;

  public charities: Array<Charity> = [];
  public user: User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get("user");
    // Instantiate a new Charity instance for Rhinos
    var charity1 = new Charity();
    charity1.id = 1;
    charity1.name = "Save the Toucans";
    charity1.slogan = "They deserve it.";
    charity1.about = "Toucans deserve to be saved. They are a natural treasure and need to be cheriched. Look at their colors. They are very cool. They live in the jungle and eat fruits and seeds and things. Save them!";
    charity1.photo = "https://images-na.ssl-images-amazon.com/images/I/31P8NY5pSjL.jpg";

    // Instantiate a new Charity instance for Dogs
    var charity2 = new Charity();
    charity2.id = 2;
    charity2.name = "Paint the Beaks Fund";
    charity2.slogan = "Beak style should be available to all.";
    charity2.about = "Everyone should be given the opportunity to be beautiful. At Paint the Beaks Fund, we're trying to allow underprivilidged toucans the ability to up their game and become a little more vibrant, expressing themselves to find suitable mates.";
    charity2.photo = "link";

    // Instantiate a new Charity instance for Rhinos
    var charity3 = new Charity();
    charity3.id = 3;
    charity3.name = "Bring Touncans Back";
    charity3.slogan = "Ushering in a new era of toucan appreciation.";
    charity3.about = "Ever since the 90s, toucans have fallen out of fashion. This is a mistake. Bring back toucan appreciation; it'll be worth it.";
    charity3.photo = "http://4.bp.blogspot.com/-Onq4C35Q1c8/UPkbURKrMgI/AAAAAAAAClM/CKOANISCvCo/s1600/2012%2B0601%2B408.jpg";

    // Instantiate a new Charity instance for Dogs
    var charity4 = new Charity();
    charity4.id = 4;
    charity4.name = "Cute Toucan Outreach";
    charity4.slogan = "Everyone wants to see cute toucans.";
    charity4.about = "Cute animals are a necessity of the world. Donate to see cuteness in the form of toucans.";
    charity4.photo = "https://a-z-animals.com/media/animals/images/original/toucan3.jpg";

    // Instantiate a new Charity instance for Dogs
    var charity5 = new Charity();
    charity5.id = 5;
    charity5.name = "Toucan Youth Center";
    charity5.slogan = "Keeping our kids off the streets.";
    charity5.about = "We believe that every toucan should have an opportunity to have a successful life, no matter where they're born or how many seeds their family has.";
    charity5.photo = "https://cdn.drawception.com/images/panels/2017/11-21/wtFhM6cgr3-6.png";

    // Instantiate a new Charity instance for Dogs
    var charity6 = new Charity();
    charity6.id = 6;
    charity6.name = "Fruit Addiction Rehab";
    charity6.slogan = "Everything in moderation.";
    charity6.about = "We want to give toucans a shot at overcoming their vices with respect to fruit, letting them decide for themselves when and how they want to change. Toucans have the right to write their own destinies; donate now to help.";
    charity6.photo = "https://images.fineartamerica.com/images-medium-large-5/toco-toucan-eating-fruit-science-photo-library.jpg";

    // Add our 2 charity instances to our collection of charities
    this.charities.push(charity1);
    this.charities.push(charity2);
    this.charities.push(charity3);
    this.charities.push(charity4);
    this.charities.push(charity5);
    this.charities.push(charity6);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowsePage');
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