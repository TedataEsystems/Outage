import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { settingModel } from 'src/app/model/settingModel';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { ProblemTypeService } from 'src/app/shared/service/problem-type.service';

@Component({
  selector: 'app-problem-type',
  templateUrl: './problem-type.component.html',
  styleUrls: ['./problem-type.component.css']
})
export class ProblemTypeComponent implements OnInit {

  ProblemTypeList: settingModel[] = [];
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
  displayedColumns: string[] = ['Id', 'ProblemType', 'createdBy', 'creationDate', 'updatedBy', 'updateDate', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''

  constructor(private problemTypeService: ProblemTypeService, private titleService: Title, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog: MatDialog
  ) {
    this.titleService.setTitle('نوع المشكلة');

  }

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })



  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.problemTypeService.getProblemType(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.ProblemTypeList = response?.data;
      this.ProblemTypeList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.ProblemTypeList);
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
    let ProblemType = {
      id: row.id,
      name: row.name,
      createdBy: row.createdBy,
      creationDate: row.creationDate,
      updatedBy: localStorage.getItem('userName') || '',
    };
    this.problemTypeService.updateProblemType(ProblemType).subscribe(res => {
      if (res.ProblemType) {
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





  addProblemType() {
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
    let ProblemType = {
      id: 0,
      name: this.form.value.Name,
      createdBy: localStorage.getItem('userName') || ''
    };
    if (this.form.valid) {
      this.problemTypeService.addProblemType(ProblemType).subscribe(res => {
        this.form['controls']['Name'].setValue('');
        this.form['controls']['Id'].setValue(0);
        this.toastr.success("Succesfully added");
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);

      })
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
    debugger
    let ProblemType = {
      name: this.form.value.Name,
      id: 0
    };
    if (this.form.valid) {
      this.problemTypeService.isNameRepeated(ProblemType.name, ProblemType.id).subscribe(
        res => {
          debugger
          console.log(res)
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
    let ProblemType = {
      name: row.name,
      id: row.id
    };
    if (row.name.trim().length > 0 && row.name.trim() != '') {
      this.problemTypeService.isNameRepeated(ProblemType.name, ProblemType.id).subscribe(
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
  onDelete(r: any) {

    this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        this.problemTypeService.deleteProblemType(r.id).subscribe(res => {
          this.toastr.success(' successfully Deleted');
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        }),
          error => { this.toastr.error(' An Error Occured') }
      }
    })



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
