import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OutageFormService {

  constructor() { }
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    clientName: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    frameName: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Governorate : new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    central: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    problemType: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    problemPlace: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    circutNo: new FormControl(0,[Validators.required,Validators.min(0),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    port: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    clientAddress: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    clientNum: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    power: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    TicketNum: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    attachFile: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    attachFileId:new FormControl(0),
    creationDate:new FormControl(null),
    updateDate:new FormControl(null),
    createdBy:new FormControl(null),
    updateBy:new FormControl(null),
    statusId: new FormControl(0,[Validators.required]),


  });




  initializeFormGroup(){
    this.form.setValue({
      id:0,
      clientName:'',
      attachFileId:0,
      frameName: '',
      Governorate:0,
      circutNo: 0,
      port: '',
      clientAddress:'',
      clientNum:'',
      power: '',
      central: 0,
      problemType:0,
      problemPlace:0,
      TicketNum:'',
      attachFile: '',
      creationDate:null,
      createdBy:null,
      updateDate:null,
      updateBy:null,
      statusId:0,

    })


  }
}
