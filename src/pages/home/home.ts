import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from "@angular/http";

import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
import { TutorialPage } from '../tutorial/tutorial';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: User = new User();
  public email: string;
  public password: string;
  public jwt: string;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public authService: AuthService

  ) {
    if (this.navParams.get('user')) {
      let user = this.navParams.get('user');
      //this.user.email = user.email;
      //this.user.password = user.password;
      this.user = user;
      this.user.id = 1;
    }
  }

  navigateToLogin() {
    this.navCtrl.push(ProfilePage, {
      user: this.user
    });
  }

  // navigateToLogin() {
  //   this.navCtrl.push(TutorialPage);
  // }

  navigateToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  login(storage: Storage) {
    let callback = (err) => {
      if (err) {
        //todo: display error
       return;
      }

      this.navCtrl.push(ProfilePage);
    }
    console.log(this.user);
    this.authService.login(this.user.email, this.user.password, callback);
    this.http
      .post("http://localhost:3000/login", {
        email: this.user.email,
        password: this.user.password
      })
      .subscribe(
        result => {
          let token = result.json().token;
          localStorage.setItem('jwt', token);
          // Our username and password (on this) should have data from the user

        },
        error => {
          console.log(error);
        }
      );
  
  }

}
