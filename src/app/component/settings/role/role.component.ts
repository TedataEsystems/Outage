import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserolesList } from 'src/app/model/useroles-list';
import { DeleteService } from 'src/app/shared/service/delete.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  isShowDiv = false;
  isNameRepeated: boolean = false;
  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  isNameUpdatedRepeated: boolean = false;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['id', 'name','createdBy' ,'creationDate', 'updatedBy','updateDate', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  userRoles:UserolesList[]=[];
  public colname: string = 'Id';
  public coldir: string = 'asc';
  editUsr: any;
  editdisabled: boolean = false;
  loader: boolean = false;
  isDisabled = false;
  isDisable = false;
  userRole = {id: 0,name:'',createdBy:''}
  constructor(private titleService: Title,private toastr:ToastrService, private dailogService: DeleteService
  )
  {
    this.titleService.setTitle('الصلاحيات');
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  })
  ngOnInit(): void {

  }

  sortData(sort: any) {
    if (this.colname == sort.active && this.coldir == sort.direction) {
      if (this.coldir == 'asc')
        sort.direction == 'desc';
      else
        sort.direction == 'asc';
    }
    this.coldir = sort.direction;
    this.colname = sort.active;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();

  }
  editROw(r: any) {

    this.editUsr = r.id;
    this.editdisabled = true;
  }
  cancelEdit() {
    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;

  }
  updateEdit(row: any) {
    let userRoleEdit:UserolesList={
      id:row.id,
      name:row.name,
      creationDate:row.creationDate,
      updatedBy:localStorage.getItem('userName') || ''
    }

      this.cancelEdit();
  }
  onDelete(r:any) {
  this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
    if (res) {

        this.toastr.success(' successfully Deleted');

    }//end of if
  })//end of first subscriob

  }
  addRole() {

    this.form.reset();

    this.isShowDiv = !this.isShowDiv;
  }
  onCreateUpdate() {
    let userRole = {
      id: 0,
      name: this.form.value.name,
      createdBy:localStorage.getItem('userName') || ''
    };
    if (this.form.valid) {

      this.isShowDiv = false;
    }
  }
  onChecknameIsalreadysign()
  {
    this.userRole.id=0;
    this.userRole.name=this.form.value.name;
    if(this.form.valid)
    {
    // code here
    }
  }
  onChecknameIsalreadysignWhenUpdate(element:any)
  {
    if(element.name.trim().length>0&&element.name.trim()!='')
    {
   //code here
  }
  else{
    this.isDisabled=true;
        }

}
}
