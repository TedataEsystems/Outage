import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
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
  telecomEgyptMail: any
  outageModel: Ioutage = <Ioutage>{};
  governorateList: any[] = [];
  _governorateList: any[] = [];
  centralList: any[] = [];
  _centralList: any[] = [];
  problemPlaceList: any[] = [];
  statusList: any[] = [];
  problemTypeList: any[] = [];
  id: number = 0;
  file: File | null; // Variable to store file
  fileName: string;
  @ViewChild('centralSearch') centralSearch!: ElementRef;
  @ViewChild('governateSearch') governateSearch!: ElementRef;
  constructor(public dialogRef: MatDialogRef<EditTicketComponent>, private toastr: ToastrService, public service: OutageFormService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }


  getformLists() {
    this.service.getListsForCreate().subscribe(res => {
      this.governorateList = res.governorate;
      this._governorateList = res.governorate;
      this.centralList = res.central;
      this._centralList = res.central;
      this.problemPlaceList = res.problemLocation;
      this.problemTypeList = res.problemType;
      this.statusList = res._status
      // this.service.form.patchValue({
      //   Governorate: this.governorateList[0].id.toString(),
      //   central: this.centralList[0].id.toString(),
      //   problemType: this.problemPlaceList[0].id.toString(),
      //   problemPlace: this.problemTypeList[0].id.toString(),
      //   status : this.statusList[0].id.toString()
      // })
    });

    this.service.GetFileByOutageId(this.id).subscribe(res => {
      this.fileName = res.data.fileName;
      this.service.form['controls']['attachFile'].setValue(this.fileName)
    });


    this.service.getOutageById(this.id).subscribe(res => {
      this.outageModel = res.data;
      debugger
      // this.service.form['controls']['attachFile'].setValue(this.fileName);
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

    if (this.service.form.valid) {
      this.outageModel.customerName = this.service.form.value.clientName;
      this.outageModel.frameName = this.service.form.value.frameName;
      this.outageModel.circleNumber = this.service.form.value.circutNo;
      this.outageModel.port = this.service.form.value.port;
      this.outageModel.custommerAddress = this.service.form.value.clientAddress;
      this.outageModel.customerNumber = this.service.form.value.clientNum;
      this.outageModel.powerConfirmation = this.service.form.value.power;
      this.outageModel.ticketNumber = this.service.form.value.TicketNum;
      this.outageModel.governorateId = Number(this.service.form.value.Governorate);
      this.outageModel.centralId = Number(this.service.form.value.central);
      this.outageModel.problemTypeId = Number(this.service.form.value.problemType);
      this.outageModel.problemLocationId = Number(this.service.form.value.problemPlace);
      this.outageModel.statusId = Number(this.service.form.value.statusId);

      if (this.file == null) {
        this.service.updateOutage(this.outageModel).subscribe(res => {
          this.toastr.success(':Update successfully');
          this.onClose();
        }, error => {
          this.toastr.warning(':: An Error Occured')
        }
        );
      }
      else {
        this.service.updateOutage(this.outageModel).subscribe(res => {
          this.onClose();
          if (res.status == true) {
            this.service.upload(this.file, res.id).subscribe((res) => {
              if (res.status == true) {
                this.toastr.success(':Update successfully');
                this.onClose();
              }
              else { this.toastr.warning(':failed to upload file'); }
            });
          }
        }, error => {
          this.toastr.warning(':: An Error Occured')
        }
        );
      }

    } //end of if

  }





  onCentralInputChange() {
    const searchInput = this.centralSearch.nativeElement.value ?
      this.centralSearch.nativeElement.value.toLowerCase() : '';
    this.centralList = this._centralList.filter(u => {
      const name: string = u.name.toLowerCase();
      return name.indexOf(searchInput) > -1;
    });
  }


  onGovernateInputChange() {
    const searchInput = this.governateSearch.nativeElement.value ?
      this.governateSearch.nativeElement.value.toLowerCase() : '';
    this.governorateList = this._governorateList.filter(u => {
      const name: string = u.name.toLowerCase();
      return name.indexOf(searchInput) > -1;
    });
  }

  handleFileInputChange(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    var extensitin = this.fileName.split(".")[1];

    if (extensitin.toLowerCase() == "msg" || extensitin.toLowerCase() == "jpeg" || extensitin.toLowerCase() == "jpg" || extensitin.toLowerCase() == "png") {
      this.service.form['controls']['attachFile'].setValue(this.fileName)
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

  //#region upload attach file

  convertFileToBase64Logo(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((<string>reader.result).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }


  //#endregion

}
