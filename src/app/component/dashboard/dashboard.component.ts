import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Ichart } from 'src/app/model/Ichart';
import { DashBoardService } from 'src/app/shared/service/dash-board.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  barChart: any[] = [];
  chartData = <Ichart>{};
  count: number = 0;
  IsAdmin: boolean = true;
  isCreator = false;
  totalPending = 0;
  totalApproved = 0;
  totalRejected = 0;
  statusCount: number[]


  constructor(private toastr: ToastrService, private dashBoardService: DashBoardService, private title: Title) {
    this.title.setTitle("الصفحة الرئيسية")
  }

  ngOnInit(): void {
    this.getChartData()
  }

  getChartData(): void {
    this.dashBoardService.chartData().subscribe(res => {

      this.chartData = res.data as Ichart;
      this.count = this.chartData.totalCount;
      this.doughnutChartLabels = this.chartData.statusNameList;
      this.doughnutChartData = [this.chartData.statusNameCountList];

      this.statusCount = this.chartData.statusNameCountList;
      this.barChartData = []

      let x: any = {
        data: []=[],
        label: ''
      }
      for (let index = 0; index < this.chartData.statusNameList.length; index++) {
        x = { data: []=[], label: '' }
        x.label = this.chartData.statusNameList[index];
        x.data.push(this.chartData.statusNameCountList[index]);
        this.barChartData[index] = x
        console.log(this.barChartData)
      }

    }
      , err => { this.toastr.warning("occure an error") }
    );


  }

  /////////////////donut chart//////////////////
  doughnutChartOptions:ChartOptions = {
    responsive: true,
    legend: {
      position: 'left'
   }

  };
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    []
  ];

  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {
      backgroundColor: [
        "#0f1323",
        "#1b3c51",
        '#2d6487 ',
        '#427697',
        '#6d7277 ',
        '#80868b',
        "#791a75",
        '#8e2279',
       '#c131a5',
       "#d383c3",


        '#d7d7d7', 'red', 'pink', 'orange', 'purple', 'brown', 'DarkOrange'
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
    // { data: [], label: 'Approved' },
    // { data: [], label: 'Pending' },
    // { data: [], label: 'Rejected' }
  ];




}



