import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  posts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
      this.posts = data.data.children;


    });

    // this.posts = null;

    // this.http.get('https://www.reddit.com/r/gifs/top/.json?limit=2&sort=hot').map(res => res.json()).subscribe(data => {
    //   this.posts = data.data.children;
    // });

    // console.log(this.posts);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }


}
