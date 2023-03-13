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
import { ProblemLocationService } from 'src/app/shared/service/problem-location.service';

@Component({
  selector: 'app-problem-place',
  templateUrl: './problem-place.component.html',
  styleUrls: ['./problem-place.component.css']
})
export class ProblemPlaceComponent implements OnInit {

  ProblemPlaceList:settingModel[]=[];
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
  displayedColumns: string[] = ['Id','ProblemPlace','createdBy' ,'creationDate', 'updatedBy','updateDate', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingplace = ''

  constructor(private problemLocationService: ProblemLocationService ,private titleService: Title,private toastr:ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog:MatDialog
  ) {
    this.titleService.setTitle('مكان المشكلة');

  }

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })



  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.problemLocationService.getProblemLocation(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.ProblemPlaceList = response?.data;
      this.ProblemPlaceList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.ProblemPlaceList);
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


}
OnEditSubmit(row: any) {
  let Problemplace = {
    id: row.id,
    name: row.name,
    createdBy: row.createdBy,
    creationDate: row.creationDate,
    updatedBy: localStorage.getItem('userName') || '',
  };
  this.problemLocationService.updateProblemLocation(Problemplace).subscribe(res => {
    debugger
    if (res.problemLocation) {
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





addProblemPlace(){
this.form.reset();
this.isShowDiv = !this.isShowDiv;
}

setReactValue(id: number, val: any) {
this.form.patchValue({
  id: id,
  name: val});
}

onAddSubmit() {
let ProblemPlace = {
  id: 0,
  name: this.form.value.Name,
  createdBy: localStorage.getItem('userName') || ''
};
if (this.form.valid) {
  this.problemLocationService.addProblemLocation(ProblemPlace).subscribe(res => {
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
let ProblemPlace = {
  name: this.form.value.Name,
  id: 0
};
if (this.form.valid) {
  this.problemLocationService.isNameRepeated(ProblemPlace.name, ProblemPlace.id).subscribe(
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
let ProblemPlace = {
  name: row.name,
  id: row.id
};
if (row.name.trim().length > 0 && row.name.trim() != '') {
  this.problemLocationService.isNameRepeated(ProblemPlace.name, ProblemPlace.id).subscribe(
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
onDelete(r:any) {

this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
  if(res)
  {
    this.problemLocationService.deleteProblemLocation(r.id).subscribe(res=>{
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

