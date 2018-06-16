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
import { Charity } from '../../models/charityProfile';
import { Http } from '@angular/http';



@Component({
  selector: 'page-donations',
  templateUrl: 'donations.html'
})

export class DonationsPage {

  public user: User = new User();
  public technologies: Array<Slice> = [];
  public amount: number = 0;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
    
    let colorArr: Array<string> = ["rgb(128,0,0)", "rgb(220,20,60)", "rgb(255,0,0)", "rgb(255,127,80)", "rgb(205,92,92)", "rgb(255,165,0)", "rgb(255,215,0)", "rgb(128,128,0)", "rgb(154,205,50)", "rgb(85,107,47)", "rgb(124,252,0)", "rgb(144,238,144)", "rgb(143,188,143)", "rgb(47,79,79)", "rgb(0,139,139)", "rgb(0,255,255)", "rgb(224,255,255)", "rgb(70,130,180)", "rgb(30,144,255)", "rgb(25,25,112)"];


      let newSlice = new Slice();
      newSlice.technology = "Save the Toucans";
      newSlice.time = 40;
      newSlice.color = colorArr[0];
      this.technologies.push(newSlice);

      let newSlice1 = new Slice();
      newSlice1.technology = "Paint the Beaks Fund";
      newSlice1.time = 100;
      newSlice1.color = colorArr[5];
      this.technologies.push(newSlice1);

      let newSlice2 = new Slice();
      newSlice2.technology = "Fruit Addiction Rehab";
      newSlice2.time = 160;
      newSlice2.color = colorArr[15];
      this.technologies.push(newSlice2);
    
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

  ionViewDidLoad() {
    this.defineChartData();
    this.createPieChart();
    this.createBarChart();
    this.createLineChart();
  }

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
createBarChart(): void {
  // We'll define the pie chart related logic here shortly
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