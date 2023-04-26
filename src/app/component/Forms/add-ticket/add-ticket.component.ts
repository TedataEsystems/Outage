import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Ioutage } from 'src/app/model/Ioutage';
import { OutageFormService } from 'src/app/shared/service/outage-form.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  outage: Ioutage = <Ioutage>{};
  governorateList: any[] = [];
  _governorateList: any[] = [];
  centralList: any[] = [];
  _centralList: any[] = [];
  problemPlaceList: any[] = [];
  problemTypeList: any[] = [];
  telecomEgyptMail: any
  file: File | null; // Variable to store file
  fileName: string;
  @ViewChild('centralSearch') centralSearch!: ElementRef;
  @ViewChild('governateSearch') governateSearch!: ElementRef;
  constructor(public dialogRef: MatDialogRef<AddTicketComponent>, private toastr: ToastrService, public service: OutageFormService) { }

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
      this.outage.id = this.service.form.value.id;
      this.outage.customerName = this.service.form.value.clientName;
      this.outage.frameName = this.service.form.value.frameName;
      this.outage.circleNumber = this.service.form.value.circutNo;
      this.outage.port = this.service.form.value.port;
      this.outage.custommerAddress = this.service.form.value.clientAddress;
      this.outage.customerNumber = this.service.form.value.clientNum;
      this.outage.powerConfirmation = this.service.form.value.power;
      this.outage.ticketNumber = this.service.form.value.TicketNum;
      this.outage.governorateId = Number(this.service.form.value.Governorate);
      this.outage.centralId = Number(this.service.form.value.central);
      this.outage.problemTypeId = Number(this.service.form.value.problemType);
      this.outage.problemLocationId = Number(this.service.form.value.problemPlace);
      this.outage.statusId = 1;

      this.service.insertOutage(this.outage).subscribe(res => {
        this.onClose();
        if (res.status == true) {
          if (this.file != null) {
            this.service.upload(this.file, res.id).subscribe((res) => {
              if (res.status == true) {
                this.toastr.success(':added successfully');
                this.onClose();
              }
              else { this.toastr.warning(':failed to upload file'); }
            });
          }
        } else {
          this.toastr.warning(':failed');
        }
      }, error => {
        this.toastr.warning(':: An Error Occured')
      }
      );
    } //end of if
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
      this.telecomEgyptMail = ''
      this.toastr.warning("::Not Acceptable Extension only acceptable extenstion(jpeg,jpg,png,msg)");
    }


  }
  removeFile() {
    this.file = null;
    this.fileName = '';
    this.service.form['controls']['attachFile'].setValue('');


  }

  getformLists() {
    this.service.getListsForCreate().subscribe(res => {
      this.governorateList = res.governorate;
      this._governorateList = res.governorate;
      this.centralList = res.central;
      this._centralList = res.central;
      this.problemPlaceList = res.problemLocation;
      this.problemTypeList = res.problemType;
    });


  }

  onCentralInputChange(){
    const searchInput = this.centralSearch.nativeElement.value ?
    this.centralSearch.nativeElement.value.toLowerCase() : '' ;
    this.centralList = this._centralList.filter(u=> {
      const name : string= u.name.toLowerCase();
      return name.indexOf(searchInput) > -1 ;
    });
  }
  onGovernateInputChange(){
    const searchInput = this.governateSearch.nativeElement.value ?
    this.governateSearch.nativeElement.value.toLowerCase() : '' ;
    this.governorateList = this._governorateList.filter(u=> {
      const name : string= u.name.toLowerCase();
      return name.indexOf(searchInput) > -1 ;
    });
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

  //#endregion


}
