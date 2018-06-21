import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CharityPage } from '../charity/charity';
import { Charity } from '../../models/charityProfile';
import { MyCharity } from '../../models/myCharity';
import { User } from '../../models/user';
import { Http } from '@angular/http';
import { ConfigService } from '../../config.service';
declare var Stripe;

@Component({
  selector: 'page-stripe-java-script',
  templateUrl: 'stripe-java-script.html',
})
export class StripeJavaScriptPage {

  stripe = Stripe('pk_test_Wr8cGPVS6aiNLEsuYVi0G1wm');
  card: any;
  name: string;
  amount: number;
  curency: string;

  oneTime: boolean;
  monthly: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController, private http: Http, public configService: ConfigService) {
    // var newDonation = new MyCharity();
    // newDonation.percentage += this.amount;
    // this.charity = this.navParams.get('charity');
    // this.charity = new Charity;
    // this.user = new User();
  }
  ionViewDidLoad() {
    this.setupStripe();
  }
  // chose one-time payment
  oneTimeTrue() {
    this.oneTime = true;
    this.monthly = false;
  }

  // chose monthly payment
  monthlyTrue() {
    this.oneTime = false;
    this.monthly = true;
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (this.oneTime) {
        this.stripe.createToken(this.card)
          .then(result => {
            if (result.error) {
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              console.log(result.token);
              this.stripeTokenHandler(result.token);
              // this.navCtrl.setRoot(PortfolioPage);
              this.sendDonation();
            }
          })
      } else {
        this.stripe.createSource(this.card)
          .then(result => {
            if (result.error) {
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {

              this.stripeSourceHandler(result.source);
              // this.navCtrl.setRoot(PortfolioPage);
              this.sendDonation();
            }
          });
      }
    });
  }

  stripeTokenHandler(token) {
    this.http
      .post(this.configService.getBaseUrl() + "/payment?jwt=" + localStorage.getItem("Token"), {
        cardholder: this.name,
        paymenttoken: token.id,
        amount: this.amount,
        curency: this.curency,
        date: new Date().toDateString(),
        // time: new Date().toTimeString()
      })

      .subscribe(
        result => {
          console.log(result);
        },

        error => {
          console.log(error);
        });
  }

  stripeSourceHandler(source) {
    this.http
      .post(this.configService.getBaseUrl() + "/payment?jwt=" + localStorage.getItem("Token"), {
        cardholder: this.name,
        paymenttoken: source.id,
        amount: this.amount,
        curency: this.curency,
        date: new Date().toDateString(),
      })

      .subscribe(
        result => {
          console.log(result);
        },

        error => {
          console.log(error);
        });
  }

  sendDonation() {
    let toast = this.toastCtrl.create({
      message: 'Donation Successful!',
      duration: 3000
    });
    console.log('Donate clicked');
    toast.present();
  }
}