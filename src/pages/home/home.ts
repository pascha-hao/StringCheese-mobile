import { Component } from '@angular/core';
import { NavController, NavParams, App, ToastController } from 'ionic-angular';
//import { Headers } from "@angular/http";
import { Http } from "@angular/http";

//import { ProfilePage } from '../profile/profile';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';

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
  public jwt: string;



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public authService: AuthService,
    private app: App,
    public toastCtrl: ToastController

  ) {
    if(localStorage.getItem("jwt")) {
      this.app.getRootNav().setRoot(TabsPage);
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
          console.log("Cannot Log In");
          let toast = this.toastCtrl.create({
            message: 'Invalid Username/Password!',
            duration: 3000
          });
          toast.present();
        //todo: display error
       return;
      }
      this.navCtrl.push(TabsPage);
    }
    console.log(this.user);
    this.authService.login(this.user.email, this.user.password, callback);
  
  }


  forgot() {
    let toast = this.toastCtrl.create({
      message: 'Try Harder to Remember!',
      duration: 3000
    });
    toast.present();
  }


}
