import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { settingModel } from 'src/app/model/settingModel';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { GovernorateService } from 'src/app/shared/service/governorate.service';

@Component({
  selector: 'app-governorate',
  templateUrl: './governorate.component.html',
  styleUrls: ['./governorate.component.css']
})
export class GovernorateComponent implements OnInit {

  
  governorateList: settingModel[] = [];
  isShowDiv = false;
  isNameRepeated: boolean = false;
  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  show: boolean = false;
  loader: boolean = false;
  isDisabled: boolean = false;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  isNameUpdatedRepeated: boolean = false;

  editUsr: any;
  editdisabled: boolean = false;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['Id', 'governorate', 'createdBy', 'creationDate', 'updatedBy', 'updateDate', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''

  constructor(private governorateService: GovernorateService, private titleService: Title, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog: MatDialog
  ) {
    this.titleService.setTitle('المحافظات');

  }

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })


  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.governorateService.getGovernorate(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.governorateList = response?.data;
      this.governorateList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.governorateList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })
    setTimeout(() => this.loader = false, 2000);

  }


  ngOnInit(): void {
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  onDelete(r:any) {

    this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
      if(res)
      {
        this.governorateService.deleteGovernorate(r.id).subscribe(res=>{
        this.toastr.success(' successfully Deleted');
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        }),
        error => { this.toastr.error(' An Error Occured') }
      }
    })
  }

  editROw(r: any) {

    this.editUsr = r.id;
    this.editdisabled = true;
  }


  cancelEdit() {
    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }
  OnEditSubmit(row: any) {
    let governorate = {
      id: row.id,
      name: row.name,
      createdBy: row.createdBy,
      creationDate: row.creationDate,
      updatedBy: localStorage.getItem('userName') || '',
    };
    this.governorateService.updateGovernorate(governorate).subscribe(res => {
      if (res.governorate) {
        setTimeout(() => {
          this.loader = false;
        }, 1500)
        this.toastr.success(" update successfully");
        this.form['controls']['Name'].setValue('');
        this.form['controls']['Id'].setValue(0);
        this.cancelEdit();
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
      }
    })
  }



  addGovernorate() {
    this.form.reset();
    this.isShowDiv = !this.isShowDiv;
  }

  setReactValue(id: number, val: any) {
    this.form.patchValue({
      id: id,
      name: val
    });
  }
  onAddSubmit() {
    let governorate = {
      id: 0,
      name: this.form.value.Name,
      createdBy: localStorage.getItem('userName') || ''
    };
    if (this.form.valid) {
      this.governorateService.addGovernorate(governorate).subscribe(res => {
        this.form['controls']['Name'].setValue('');
        this.form['controls']['Id'].setValue(0);
        this.toastr.success("Succesfully added");
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);

      }
      )
      this.isShowDiv = false;
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");
  }

  IsAddNameRepeated() {
    let governorate = {
      name: this.form.value.Name,
      id: 0};
    if (this.form.valid) {
      this.governorateService.isNameRepeated(governorate.name, governorate.id).subscribe(
        res => {
          if (res.flag == true) {
            this.isDisabled = false;
            this.isNameRepeated = false;
          } else {
            this.isDisabled = true;
            this.isNameRepeated = true;
          }
        });
    }
  }

  IsUpdateNameRepeated(row: any) {
    let governorate = {
      name: row.name,
      id: row.id
    };
    if (row.name.trim().length > 0 && row.name.trim() != '') {
      this.governorateService.isNameRepeated(governorate.name, governorate.id).subscribe(
        res => {
          if (res.flag == true) {
            this.isDisabled = false;
            this.isNameUpdatedRepeated = false;
          } else {
            this.isDisabled = true;
            this.isNameUpdatedRepeated = true;
          }
        });
    }
    else {
      this.isDisabled = true;
    }
  }

  pageIn = 0;
  public pIn: number = 0;
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
    this.lastcol = sort.active; this.lastdir = sort.direction;
    var c = this.pageIn;
  }


}
