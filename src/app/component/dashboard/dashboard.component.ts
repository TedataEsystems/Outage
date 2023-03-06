import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  IsAdmin: boolean = true;
  isCreator=false;
   totalPending=0;
   totalApproved=0;
   totalRejected=0;


  constructor(private title : Title) {
    this.title.setTitle("الصفحة الرئيسية")
   }

  ngOnInit(): void {

  }

  /////////////////donut chart//////////////////
  doughnutChartLabels: Label[] = ['Approved', 'Pending', 'Rejected'];
  doughnutChartData: MultiDataSet = [];

  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {
      backgroundColor: [
        '#8e2279',
        '#80868b',
      '#d7d7d7',
"#0f1323",
 "#1b3c51",
 "#791a75",

        'blue', 'red','pink','orange','purple','brown','DeepPink','DarkOrange'
      ]
    }
  ];





/////////bar chart/////////////////////////
barChartOptions: ChartOptions = {
  responsive: true,
    scales: {
    //   y: {
    //     type:  // this is the same id that was set on the scale
    // }
    }
};
//'EFO Cash', 'Estore', 'ETSI', 'ETSM', 'EWFM','Fiber Support','Fiber Team','TE MSAN','WiMax'
barChartLabels: Label[] = [];
barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];

public barcolors: Array<any> = [
  { // first color
    backgroundColor: '#8e2279',
   // backgroundColor: 'rgb(33, 179, 33)',

  },
  { // second color
     backgroundColor: '#80868b',
    //backgroundColor: 'rgb(245, 182, 66)',

  },
{
  // thirdcolor
   backgroundColor: '#d7d7d7',
  //backgroundColor: 'rgb(221, 7, 7)',

}];
public barChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40,44,61], label: 'Approved' },
  { data: [28, 48, 40, 19, 86, 27, 90,20,33], label: 'Pending' },
  { data: [11, 60, 20, 20, 80, 11, 70,21,50], label: 'Rejected' }
];




}



