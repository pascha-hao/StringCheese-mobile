import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from "@angular/http";

import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
import { TutorialPage } from '../tutorial/tutorial';
import { AuthService } from '../../auth.service'
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: User = new User();
  public email: string;
  public password: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    public authService: AuthService
  ) {
    if (this.navParams.get('user')) {
      let user = this.navParams.get('user');
      this.user = user;
    }
  }

  navigateToLogin() {
    this.navCtrl.push(TabsPage, {
      user: this.user
    });
  }


  navigateToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    let callback = (err) => {
      if (err) {
        //todo: display error
       return;
      }

      this.navCtrl.push(TabsPage);
    }
    this.authService.login(this.email, this.password, callback);
  
  }

}
