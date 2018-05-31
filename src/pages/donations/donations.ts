import { Component, ViewChild } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams } from 'ionic-angular';

import { Chart } from '../../../node_modules/chart.js';


@Component({
  selector: 'page-donations',
  templateUrl: 'donations.html'
})
export class DonationsPage {
   @ViewChild('pieChart') pieChart;
   @ViewChild('barChart') barChart;
   @ViewChild('lineChart') lineChart;


   public technologies              : any = {
   										        "technologies" : [
                                                  {
                                                     'technology' : 'Mobile: Ionic/Angular',
                                                     'time'       : 50,
                                                     'color'      : 'rgba(206, 61, 95, 0.5)',
                                                     'hover'      : 'rgba(199, 108, 129, 0.5)'
                                                  },
                                                  {
                                                     'technology' : 'Front-end: Sass/CSS',
                                                     'time'       : 15,
                                                     'color'      : 'rgba(83, 131, 185, 0.5)',
                                                     'hover'      : 'rgba(122, 160, 202, 0.5)'
                                                  },
                                                  {
                                                     'technology' : 'Server: PHP/MySQL',
                                                     'time'       : 10,
                                                     'color'      : 'rgba(198, 147, 194, 0.5)',
                                                     'hover'      : 'rgba(200, 166, 197, 0.5)'
                                                  },
                                                  {
                                                     'technology' : 'Code Documentation',
                                                     'time'       : 5,
                                                     'color'      : 'rgba(54, 116, 152, 0.5)',
                                                     'hover'      : 'rgba(103, 139, 160, 0.5)'
                                                  },
                                                  {
                                                     'technology' : 'Knowledge: Blogging',
                                                     'time'       : 10,
                                                     'color'      : 'rgba(152, 54, 145, 0.5)',
                                                     'hover'      : 'rgba(152, 89, 149, 0.5)',
                                                  },
                                                  {
                                                     'technology' : 'SEO/Online Marketing',
                                                     'time'       : 10,
                                                     'color'      : 'rgba(192, 192, 192, 0.5)',
                                                     'hover'      : 'rgba(220, 220, 220, 0.5)'
                                                  }
   										       ]
   										    };
   public pieChartEl                : any;
   public barChartEl                : any;
   public lineChartEl               : any;
   public chartLabels               : any    = [];
   public chartValues               : any    = [];
   public chartColours              : any    = [];
   public chartHoverColours         : any    = [];
   public chartLoadingEl            : any;


   constructor( public navCtrl      : NavController,
                public navParams    : NavParams)
   { }




   ionViewDidLoad()
   {
      this.defineChartData();
      this.createPieChart();
      this.createBarChart();
      this.createLineChart();
   }



   /**
    *
    * Parse the JSON data, push specific keys into selected arrays for use with
    * each chart
    *
    */
   defineChartData() : void
   {
      let k : any;

      for(k in this.technologies.technologies)
      {
         var tech  =      this.technologies.technologies[k];

         this.chartLabels.push(tech.technology);
         this.chartValues.push(tech.time);
         this.chartColours.push(tech.color);
         this.chartHoverColours.push(tech.hover);
      }
   }




   /**
 *
 * Configure the Pie chart, define configuration options
 *
 */
createPieChart()
{

   this.pieChartEl 				= 	new Chart(this.pieChart.nativeElement,
   {
      type: 'pie',
      data: {
         labels: this.chartLabels,
         datasets: [{
            label                 : 'Daily Technology usage',
            data                  : this.chartValues,
            duration              : 2000,
            easing                : 'easeInQuart',
            backgroundColor       : this.chartColours,
            hoverBackgroundColor  : this.chartHoverColours
         }]
      },
      options : {
         maintainAspectRatio: false,
         layout: {
            padding: {
               left     : 10,
               right    : 10,
               top      : 0,
               bottom   : 0
            }
         },
         animation: {
            duration : 5000
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
   createBarChart() : void
   {
      // We'll define the pie chart related logic here shortly
   }




   /**
    *
    * Configure the Line chart, define configuration options
    *
    */
   createLineChart() : void
   {
      // We'll define the pie chart related logic here shortly
   }



}