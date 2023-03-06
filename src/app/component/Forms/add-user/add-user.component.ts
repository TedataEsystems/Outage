import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobDegree } from 'src/app/model/job-degree';
import { Team } from 'src/app/model/team';
import { User, UserList } from 'src/app/model/user-list';
import { UserolesList } from 'src/app/model/useroles-list';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
 
  constructor(public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private _router: Router) {
  }
  newuser1: User = new User();
  userRoles: UserolesList[] = [];
  jobDegrees: JobDegree[] = [];
  teams: Team[] = [];
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    jobNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    team: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    jobDegree: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    userRole: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    // userName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    userName: new FormControl('')
})
  isDisabled: boolean;
  isNameRepeated: boolean;
  dialogTitle: string = "";
  teamExist: number = 0;
  jobDegreeExist: number = 0;
  userRoleExist: number = 0;
  user = { jobNum: "" }
  ngOnInit() {
    if (this.data.dialogTitle !== "اضافة جديد") {
      this.dialogTitle = 'تعديل';
    }
    else {
      this.dialogTitle = this.data.dialogTitle;
    }
    this.form;
   
   
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.data.dialogTitle == "اضافة جديد") {
      this.newuser1.name = this.form.value.name;
      this.newuser1.teamId = this.form.value.team;
      this.newuser1.jobNumber = this.form.value.jobNumber;
      this.newuser1.roleId = this.form.value.userRole;
      this.newuser1.jobDegreeid = this.form.value.jobDegree;
      this.newuser1.createdBy = localStorage.getItem("userName");
      let userName = this.form.value.userName;
      if (userName != null) {
        //code here
      }
      else {
        this.newuser1.userName = this.form.value.userName;
      
        this.toastr.success(' Submitted successfully');
      }
    }
    else {
      this.newuser1.id = this.form.value.Id;
      this.newuser1.name = this.form.value.name;
      this.newuser1.teamId = this.form.value.team;
      this.newuser1.jobNumber = this.form.value.jobNumber;
      this.newuser1.roleId = this.form.value.userRole;
      this.newuser1.jobDegreeid = this.form.value.jobDegree;
      this.newuser1.updatedBy = localStorage.getItem("userName");
      let userName = this.form.value.userName;
      if (userName != null) {
       //code here
      }
      else {
        this.newuser1.userName = this.form.value.userName;
      
        this.toastr.success(' Submitted successfully');
      }
    }
    this.onClose();
    //this._router.navigate(['/user']);
  }
  onClose() {
    this.form.reset();
    this.dialogRef.close('save');
  }
  onCheckJobNumIsalreadysign() {
    this.user.jobNum = this.form.value.jobNumber;
  
      //not asign before
   
        // this.isDisabled = false;
        // this.isNameRepeated = false;

      //already exsit
     
        // this.isDisabled = true;
        // this.isNameRepeated = true;
     
   
  }
}
