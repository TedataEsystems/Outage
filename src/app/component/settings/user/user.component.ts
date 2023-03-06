import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserList } from 'src/app/model/user-list';
import { DeleteService } from 'src/app/shared/service/delete.service';

import { AddUserComponent } from '../../Forms/add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';
  loader: boolean = false;
  users: UserList[] = [];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @Input() param = 'file';
  @ViewChild('LIST') template!: TemplateRef<any>;
  @ViewChild('fileInput') fileInput?: ElementRef;
  @ViewChild('data') data?: ElementRef;
  @ViewChild('Msg') Msg!: TemplateRef<any>;
  fileAttr = 'Choose File';
  fileAttrF = 'Choose File';
  htmlToAdd: string = "";
  fileuploaded: any;
  displayedColumns: string[] = ['id','jobNumber','Name','Team','jobDegree','createdBy','creationDate','updateBy','updateDate','action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''
  editUsr: any;
  editdisabled: boolean = false;
  pageIn = 0;
  public pIn: number = 0;
  pagesizedef:number=100;
  previousSizedef:number=100;
  message:string="";
  constructor(private titleService: Title, private toastr: ToastrService,private _router:Router,private router: Router, private bottomSheet: MatBottomSheet,
              private route: ActivatedRoute, private dailogService: DeleteService, private dialog: MatDialog,
              private _bottomSheet: MatBottomSheet)
  {
    this.titleService.setTitle('المستخدمين');
  }
  ngOnInit(): void {
     if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
      {
       this.router.navigateByUrl('/login');
      }


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
  onEdit(row: any) {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { dialogTitle: " تعديل" };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'edit-dialog';
    this.dialog.open(AddUserComponent, { panelClass: "edit-dialog", disableClose: true, autoFocus: true, width: "50%", data: row }).afterClosed().subscribe(result => {

    });
  }
  onDelete(r: any) {
    this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {

          this.toastr.success(' successfully Deleted');

      }//end of if
    })//end of first subscriob

    //}

  }
  addUser() {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { dialogTitle: "اضافة جديد" };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'edit-dialog';
    this.dialog.open(AddUserComponent, dialogGonfig).afterClosed().subscribe(res => {

    });

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
 
}
