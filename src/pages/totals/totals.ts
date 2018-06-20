import { Component, ViewChild } from '@angular/core';
import {
  //IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';

import { Chart } from '../../../node_modules/chart.js';
import { MyCharity } from '../../models/myCharity';
import { Slice } from '../../models/slice';
import { User } from '../../models/user';
import { Donation } from '../../models/donation';
import { Charity } from '../../models/charityProfile';
import { ConfigService } from '../../config.service';
import { Http } from '@angular/http';

import { DonationsPage } from '../donations/donations';
import { BreakdownPage } from '../breakdown/breakdown';

@Component({
  selector: 'page-totals',
  templateUrl: 'totals.html'
})

export class TotalsPage {

  public user: User = new User();
  public technologies: Array<Slice> = [];
  public amount: number = 0;
  public donations: Array<Donation> = [];
  public total: number = 0;
  public totals: Array<Donation> = [];
  public max: number = 0
  jwt: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public http: Http, public configService: ConfigService) {
    this.jwt = localStorage.getItem('jwt');
    this.http
      .get(this.configService.getBaseUrl() + "/donations", {
        params: {
          jwt: this.jwt
        }
      })
      .subscribe(
        result => {
          this.donations = result.json();
          var unique = true;
          console.log("were here")
          for (let i = 0; i < this.donations.length; i++) {
            this.total += this.donations[i].amount;
            console.log(this.total);
            console.log(this.donations);
            for (let j = 0; j < this.totals.length; j++) {
              if (this.totals[j].charity_id && (this.donations[i].charity_id == this.totals[j].charity_id)) {
                unique = false;
                this.totals[j].amount += this.donations[i].amount;
                console.log(this.totals);
              }
            }
            if (unique) {
              this.totals.push(this.donations[i]);
            }
            unique = true;
          }
          console.log("this is final");
          console.log(this.totals);

          this.max = this.totals[0].amount;

          for (var x = 0; x < this.totals.length; x++) {
            let newSlice = new Slice();
            newSlice.technology = this.totals[x].charity_name;
            if (this.totals[x].amount > this.max) {
              this.max = this.totals[x].amount;
            }
            let colorArr: Array<string> = ["rgb(128,0,0)", "rgb(220,20,60)", "rgb(255,0,0)", "rgb(255,127,80)", "rgb(205,92,92)", "rgb(255,165,0)", "rgb(255,215,0)", "rgb(128,128,0)", "rgb(154,205,50)", "rgb(85,107,47)", "rgb(124,252,0)", "rgb(144,238,144)", "rgb(143,188,143)", "rgb(47,79,79)", "rgb(0,139,139)", "rgb(0,255,255)", "rgb(224,255,255)", "rgb(70,130,180)", "rgb(30,144,255)", "rgb(25,25,112)"];
    
            newSlice.time = this.totals[x].amount;
            newSlice.color = colorArr[x];
            this.technologies.push(newSlice);
          }
            
          this.defineChartData();
          //this.createPieChart();
          this.createBarChart();
          //this.createLineChart();

          //let amounts = result.json()[0].amount;
        },
        error => {
          console.log(error);
        }

      );

  }

  navTotalsPage() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  navBreakdownPage() {
    this.navCtrl.push(BreakdownPage);
  }

  navHistoryPage() {
    this.navCtrl.push(DonationsPage);
  }



  @ViewChild('pieChart') pieChart;
  @ViewChild('barChart') barChart;
  @ViewChild('lineChart') lineChart;


  public pieChartEl: any;
  public barChartEl: any;
  public lineChartEl: any;
  public chartLabels: any = [];
  public chartValues: any = [];
  public chartColours: any = [];
  public chartHoverColours: any = [];
  public chartLoadingEl: any;

  // ionViewDidLoad() {
  //   this.defineChartData();
  //   this.createPieChart();
  //   this.createBarChart();
  //   this.createLineChart();
  // }

  update() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


  defineChartData(): void {
    let k: any;

    for (k in this.technologies) {
      var tech = this.technologies[k];

      this.chartLabels.push(tech.technology);
      this.chartValues.push(tech.time);
      this.chartColours.push(tech.color);
      //this.chartHoverColours.push(tech.hover);
    }
  }




  /**
  *
  * Configure the Pie chart, define configuration options
  *
  */
  createPieChart() {

    this.pieChartEl = new Chart(this.pieChart.nativeElement,
      {
        type: 'pie',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Donation Breakdown',
            data: this.chartValues,
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.chartColours,
          }]
        },
        options: {
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          animation: {
            duration: 5000
          }
        }
      });

    this.chartLoadingEl = this.pieChartEl.generateLegend();
  }




  /**
   *
   * Configure the Bar chart, define configuration options
   *
   */
  createBarChart() {
    this.barChartEl = new Chart(this.barChart.nativeElement,
      {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Donation Totals',
            data: this.chartValues,
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.chartColours,
            // hoverBackgroundColor  : this.chartHoverColours
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: true,
            boxWidth: 80,
            fontSize: 15,
            padding: 0
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: this.max/10,
                max: this.max
              }
            }],
            xAxes: [{
              ticks: {
                autoSkip: false
              }
            }]
          }
        }
      });
  }




  /**
   *
   * Configure the Line chart, define configuration options
   *
   */
  createLineChart(): void {
    // We'll define the pie chart related logic here shortly
  }



}