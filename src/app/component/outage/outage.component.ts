import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Ioutage } from 'src/app/model/Ioutage';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { OutageFormService } from 'src/app/shared/service/outage-form.service';
import { AddTicketComponent } from '../Forms/add-ticket/add-ticket.component';
import { EditTicketComponent } from '../Forms/edit-ticket/edit-ticket.component';

@Component({
  selector: 'app-outage',
  templateUrl: './outage.component.html',
  styleUrls: ['./outage.component.css']
})
export class OutageComponent implements OnInit {
  outageList: any[] = [];
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  searchKey: string = '';
  warning = false;
  loader = false;
  lastcol: string = 'Id';
  lastdir: string = 'asc';
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  displayedColumns: string[] = [
    'id',
    'clientName',
    'frameName',
    'Governorate',
    'central',
    'problemType',
    'problemPlace',
    'circutNo',
    'port',
    'clientAddress',
    'clientNum',
    'power',
    'TicketNum',
    'status',
    'creationDate',
    'updateDate',
    'createdBy',
    'updatedBy',
    'action',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  form: FormGroup = new FormGroup({
    createdDateFrom: new FormControl(''),
    createdDateTo: new FormControl(''),
    updatedDateTo: new FormControl(''),
    updatedDateFrom: new FormControl(''),
    createdBy: new FormControl(''),
    updatedBy: new FormControl(''),
    id: new FormControl(''),

    statusId: new FormControl(''),
    clientName: new FormControl(''),
    frameName: new FormControl(''),
    Governorate: new FormControl(''),
    central: new FormControl(''),
    problemType: new FormControl(''),
    problemPlace: new FormControl(''),
    circutNo: new FormControl(0),
    port: new FormControl(''),
    clientAddress: new FormControl(''),
    clientNum: new FormControl(''),
    power: new FormControl(''),
    TicketNum: new FormControl(''),
  });
  constructor(
    private titleService: Title,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dailogService: DeleteService,
    private outageService: OutageFormService

  ) {
    this.titleService.setTitle('الانقطاعات');
  }

  ngOnInit(): void {
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }


  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.outageService.getOutages(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.outageList = response?.data;
      this.outageList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.outageList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })
    setTimeout(() => this.loader = false, 2000);
  }

  //when empty search input
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  // when add search value and key up
  applyFilter() {

    let searchData = this.searchKey.trim().toLowerCase();

  } //applyfilter

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  AdvancedSearchSubmit() {


  }
  clearAdvancedSearch() {
    // this.form.reset();

  }

  //sort
  sortData(sort: any) {
    if (this.lastcol == sort.active && this.lastdir == sort.direction) {
      if (this.lastdir == 'asc') {
        sort.direction = 'desc';
      } else {
        sort.direction = 'asc';
      }
    }
    this.lastcol = sort.active;
    this.lastdir = sort.direction;

  }
  //////add (open add component as dialog)
  addTicket() {
    const dialogGonfig = new MatDialogConfig();

    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = '50%';
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog
      .open(AddTicketComponent, dialogGonfig)
      .afterClosed()
      .subscribe((result) => {
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
      });
  }


  onEdit(row) {
    this.dialog
      .open(EditTicketComponent, {
        panelClass: 'modals-dialog',
        disableClose: true,
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((result) => {

      });
  }




  /////////////////delete
  onDelete(r: any) {


    this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        this.outageService.deleteOutage(r.id).subscribe(res => {
          this.toastr.success(' successfully Deleted');
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        }),
          error => { this.toastr.error(' An Error Occured') }
      }
    })
  }
}
