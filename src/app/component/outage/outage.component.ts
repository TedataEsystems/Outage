import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AdvancedSearch } from 'src/app/model/advanced-search';
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
  userRole = ''
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
  advSearcOutege: AdvancedSearch = <AdvancedSearch>{};
  outeges: Ioutage[] = [];
  governorateList: any[] = [];
  centralList: any[] = [];
  problemPlaceList: any[] = [];
  problemTypeList: any[] = [];
  statuesList: any[] = [];
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
    'exporAttach',
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
    ticketNum: new FormControl(''),
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
    this.getformLists();
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }


  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.userRole = localStorage.getItem("userGroup");
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
    this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");

  } //applyfilter

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  AdvancedSearchSubmit() {
    this.advSearcOutege.createdDateFrom = this.form.value.createdDateFrom == '' ? null : this.form.value.createdDateFrom;
    this.advSearcOutege.createdDateTo = this.form.value.createdDateTo == '' ? null : this.form.value.createdDateTo;
    //
    this.advSearcOutege.updatedDateFrom = this.form.value.updatedDateFrom == '' ? null : this.form.value.updatedDateFrom;
    this.advSearcOutege.updatedDateTo = this.form.value.updatedDateTo == '' ? null : this.form.value.updatedDateTo;
    //
    this.advSearcOutege.createdBy = this.form.value.createdBy;
    this.advSearcOutege.updatedBy = this.form.value.updatedBy;
    //
    this.advSearcOutege.id = Number(this.form.value.id);

    this.advSearcOutege.statusId = this.form.value.statusId;
    this.advSearcOutege.customerName = this.form.value.clientName;
    this.advSearcOutege.frameName = this.form.value.frameName;
    this.advSearcOutege.governorateId = this.form.value.governorateId;
    this.advSearcOutege.centralId = this.form.value.centralId;
    this.advSearcOutege.problemTypeId = this.form.value.problemTypeId;
    this.advSearcOutege.problemLocationId = this.form.value.problemLocationId;
    this.advSearcOutege.circleNumber = this.form.value.circutNo;

    this.advSearcOutege.port = this.form.value.port;
    this.advSearcOutege.custommerAddress = this.form.value.clientAddress;
    this.advSearcOutege.customerNumber = this.form.value.clientNum;
    this.advSearcOutege.powerConfirmation = this.form.value.power;
    this.advSearcOutege.ticketNumber = this.form.value.ticketNum;
    //this.advSearcOutege.jobDegreeId = this.form.value.jobDegreeId;
    console.log(this.advSearcOutege, "advSearch")
    this.outageService.AdvancedSearch(this.advSearcOutege).subscribe((res) => {
      console.log(res, "result for advanced");
      this.outeges = res as Ioutage[];
      this.dataSource = new MatTableDataSource<any>(this.outeges);
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource.sort = this.sort as MatSort;
      setTimeout(() => {
        //  this.loader.idle();
      }, 2000)
    });

  }
  clearAdvancedSearch() {
    this.form.reset();
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);

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

  exportAttach(row: any) {

    this.outageService.DownloadAttach(row.id).subscribe(res => {
      const linkSource =
        'data:' + res.type + ';base64,' + res.data;
      const downloadLink = document.createElement('a');
      const fileName = res.name;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();

    });
  }

  getformLists() {
    this.outageService.getListsForCreate().subscribe(res => {
      this.governorateList = res.governorate;
      this.centralList = res.central;
      this.problemPlaceList = res.problemLocation;
      this.problemTypeList = res.problemType;
      this.statuesList = res._status;
    });


  }
}
