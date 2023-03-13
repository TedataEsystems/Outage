import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Ioutage } from 'src/app/model/Ioutage';
import { OutageFormService } from 'src/app/shared/service/outage-form.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  outageModel: Ioutage = <Ioutage>{};
  governorateList: any[] = [];
  centralList: any[] = [];
  problemPlaceList: any[] = [];
  problemTypeList: any[] = [];
  id: number = 0;
  file: File | null; // Variable to store file
  fileName: string;

  constructor(public dialogRef: MatDialogRef<EditTicketComponent>, private toastr: ToastrService, public service: OutageFormService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }


  getformLists() {
    this.service.getListsForCreate().subscribe(res => {
      this.governorateList = res.governorate;
      this.centralList = res.central;
      this.problemPlaceList = res.problemLocation;
      this.problemTypeList = res.problemType;
      this.service.form.patchValue({
        Governorate: this.governorateList[0].id.toString(),
        central: this.centralList[0].id.toString(),
        problemType: this.problemPlaceList[0].id.toString(),
        problemPlace: this.problemTypeList[0].id.toString()
      })
    });

    this.service.getOutageById(this.id).subscribe(res => {
      this.outageModel = res.data;
      this.service.form.patchValue({
        clientName: this.outageModel.customerName,
        frameName: this.outageModel.frameName,
        Governorate: this.outageModel.governorateId.toString(),
        central: this.outageModel.centralId.toString(),
        problemType: this.outageModel.problemTypeId.toString(),
        problemPlace: this.outageModel.problemLocationId.toString(),
        circutNo: this.outageModel.circleNumber,
        port: this.outageModel.port,
        clientAddress: this.outageModel.custommerAddress,
        clientNum: this.outageModel.customerNumber,
        power: this.outageModel.powerConfirmation,
        TicketNum: this.outageModel.ticketNumber,
        attachFile: this.outageModel.telecomEgyptMail,
        statusId: this.outageModel.statusId.toString(),
      })
    });

  }

  ngOnInit(): void {
    this.getformLists()
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
    var extensitin = this.fileName.split(".")[1];

    if (extensitin.toLowerCase() == "msg" || extensitin.toLowerCase() == "jpeg" || extensitin.toLowerCase() == "jpg" || extensitin.toLowerCase() == "png") {
      this.service.form['controls']['attachFile'].setValue(this.fileName);
    }
    else {
      this.fileName = "";
      this.toastr.warning("::Not Acceptable Extension only acceptable extenstion(jpeg,jpg,png,msg)");
    }


  }
  removeFile() {
    this.file = null;
    this.fileName = '';
    this.service.form['controls']['attachFile'].setValue('');


  }

}
