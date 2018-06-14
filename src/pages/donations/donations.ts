import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';

import { Chart } from '../../../node_modules/chart.js';
import { MyCharity } from '../../models/myCharity';
import { Slice } from '../../models/slice';
import { User } from '../../models/user';
import { Charity } from '../../models/charityProfile';
import { Http } from '@angular/http';



@Component({
  selector: 'page-donations',
  templateUrl: 'donations.html'
})

export class DonationsPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  user: User;
  jwt: string;
  username: string;
  donationAmount: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  charities: Array<string> = ["", "", "", "", "", "", "", "", ""];
  charitiesFinal: Array<string>=[];
  donationAmountFinal:Array<number>=[];
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: Http
  ) {

      localStorage.get('jwt').then((val) => {
          this.jwt = val;
          this.http
              .get("http://localhost:3000/users", {
                  params: {
                      jwt: this.jwt
                  }
              })
              .subscribe(
                  result => {
                      let tUser = result.json().user;
                      this.user = tUser;
                      this.username = tUser.username
                      this.http
                          .get("http://localhost:3000/users/{user_id}/donations", {
                              params: {
                                  user_id: tUser.id
                              }
                          })
                          .subscribe(
                              result => {
                                  var donations = result.json();
                                  let i = 0;
                                  let len = donations.length;
                                  let tval = 0;
                                  while (i < len) {
                                      tval = donations[i].amount_donated;
                                      this.donationAmount[donations[i].charity_id] += tval;
                                      i++
                                  }
                                  this.http
                                      .get("http://localhost:3000/charities")
                                      .subscribe(
                                          result => {
                                              let i = 0;
                                              let charityList = result.json();
                                              while (i < charityList.length) {
                                                  this.charities[charityList[i].id] = charityList[i].name;
                                                  i++;
                                              }
                                              this.makeDonut()
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
      });

  }


  makeDonut() {
      let i=0;
      let len= this.charitiesFinal.length;
      while(i<len){
          this.charitiesFinal.pop();
          this.donationAmountFinal.pop();
          i++;
      }
      while(i<this.charities.length){
          if(this.donationAmount[i]!=0){
              this.donationAmountFinal.push(this.donationAmount[i]);
              this.charitiesFinal.push(this.charities[i]);
          }
          i++;
      }
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
          type: 'doughnut',
          data: {
              labels: this.charitiesFinal,
              datasets: [{
                  label: 'Percent of donation',
                  data: this.donationAmountFinal,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56"
                  ]
              }]
          }

      });
  }

  reload(){
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}