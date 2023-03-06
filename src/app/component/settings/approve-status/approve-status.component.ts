import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/model/status';
import { DeleteService } from 'src/app/shared/service/delete.service';




@Component({
  selector: 'app-approve-status',
  templateUrl: './approve-status.component.html',
  styleUrls: ['./approve-status.component.css']
})
export class ApproveStatusComponent implements OnInit {
  statusList:Status[]=[];
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
  displayedColumns: string[] = ['Id','status','createdBy' ,'creationDate', 'updatedBy','updateDate', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''
  // Status = {id: 0,name:'',createdBy:''}

  constructor(private titleService: Title,private toastr:ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog:MatDialog
  ) {
    this.titleService.setTitle('الحالة');

  }

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })




  ngOnInit(): void {

  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  onDelete(r:any) {

    this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
      if(res)
      {

        this.toastr.success(' successfully Deleted');

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


}
OnEditSubmit(row: any) {
  let status={
    id:row.id,
    name:row.name,
    createdBy:row.createdBy,
    creationDate:row.creationDate,
    updatedBy: localStorage.getItem('userName') || '',
  };



}



addStatus(){

  // const dialogGonfig = new MatDialogConfig();
  // dialogGonfig.data= {dialogTitle: " "};
  // dialogGonfig.disableClose = true;
  // dialogGonfig.autoFocus = true;
  // dialogGonfig.width = "50%";
  // dialogGonfig.panelClass = 'modals-dialog';
  //  this.dialog.open(AddApproveStatusComponent,dialogGonfig)
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
  let status={
    id:0,
    name:this.form.value.Name,
    createdBy: localStorage.getItem('userName') || ''
  };
  if (this.form.valid ) {
   
    this.isShowDiv = false;
  }





}

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
   
  }

  IsAddNameRepeated() {
    let status={
    name:this.form.value.Name,
    id:0
  };
  if(this.form.valid)
  {
   //code here
  }}

  IsUpdateNameRepeated(row: any) {
    let status={
      name:row.name,
      id:row.id
    };
    if(row.name.trim().length>0&&row.name.trim()!='')
     {
      //code here
    }
    else{
      this.isDisabled=true;
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
