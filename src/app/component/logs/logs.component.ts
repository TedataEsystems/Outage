import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Logs } from 'src/app/model/logs';
import { LogsService } from 'src/app/shared/service/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class LogsComponent implements OnInit {

  searchKey:string ='' ;
  constructor(private logService : LogsService ,  private title:Title,private route: ActivatedRoute,private _router:Router,private toastr:ToastrService){

    this.title.setTitle("History")

  }

  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['Id', 'userName' ,'creationDate','parentType','elementId', 'actionType' ,'Details'];
  dataSource = new MatTableDataSource();
  logsList:Logs[]=[]
  sortColumnDef: string = "Id";
  SortDirDef: string = 'desc';
  loader: boolean = false;

  ngOnInit(){
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }
  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.logService.getLogs(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.logsList = response?.data;
      debugger
      console.log(this.logsList)
      this.logsList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.logsList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })
    setTimeout(() => this.loader = false, 2000);

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;}

    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }
    applyFilter(){
      let searchData = this.searchKey.trim().toLowerCase();

    }
    pageIn = 0;
    public pIn: number = 0;
    pagesizedef:number=100;
    previousSizedef:number=100;
    lastcol: string = 'Id';
    lastdir: string = 'asc';
    sortData(sort: any) {
        if (this.pIn != 0)
          window.location.reload();
        if (this.lastcol == sort.active && this.lastdir == sort.direction) {
          if (this.lastdir == 'asc')
            sort.direction = 'desc';
          else
            sort.direction = 'asc';
        }
        this.lastcol = sort.active;
        this.lastdir = sort.direction;
        var c = this.pageIn;

    }

}
