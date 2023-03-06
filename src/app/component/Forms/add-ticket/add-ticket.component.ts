import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OutageFormService } from 'src/app/shared/service/outage-form.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  file: File |null; // Variable to store file
  fileName: string;

  constructor(public dialogRef: MatDialogRef<AddTicketComponent>,private toastr: ToastrService, public service: OutageFormService) { }

  ngOnInit(): void {
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close('save');
  }
  onSubmit() {
    if (!this.service.form.valid) {
      return;
    } //end of if
  this.toastr.success(' Successfully Added')

  }







  handleFileInputChange(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    var extensitin=this.fileName.split(".")[1];

    if(extensitin.toLowerCase()=="msg"||extensitin.toLowerCase()=="jpeg"||extensitin.toLowerCase()=="jpg"||extensitin.toLowerCase()=="png"){
      this.service.form['controls']['attachFile'].setValue(this.fileName);
    }
    else{
      this.fileName ="";
      this.toastr.warning("::Not Acceptable Extension only acceptable extenstion(jpeg,jpg,png,msg)");
    }


  }
  removeFile() {
    this.file = null;
    this.fileName ='';
   this.service.form['controls']['attachFile'].setValue('');


  }

}
