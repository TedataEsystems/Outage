import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ioutage } from 'src/app/model/Ioutage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutageFormService {
  baseUrl = `${environment.apiUrl}Outage`;
  model: Ioutage = <Ioutage>{};

  headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',

  });

  constructor(private http: HttpClient) { }
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    clientName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    frameName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Governorate: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    central: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    problemType: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    problemPlace: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    circutNo: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    port: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    clientAddress: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    clientNum: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    power: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    TicketNum: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    attachFile: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    attachFileId: new FormControl(0),
    creationDate: new FormControl(null),
    updateDate: new FormControl(null),
    createdBy: new FormControl(null),
    updateBy: new FormControl(null),
    statusId: new FormControl('', [Validators.required]),


  });




  initializeFormGroup() {
    this.form.setValue({
      id: 0,
      clientName: '',
      attachFileId: 0,
      frameName: '',
      Governorate: 0,
      circutNo: 0,
      port: '',
      clientAddress: '',
      clientNum: '',
      power: '',
      central: 0,
      problemType: 0,
      problemPlace: 0,
      TicketNum: '',
      attachFile: '',
      creationDate: null,
      createdBy: null,
      updateDate: null,
      updateBy: null,
      statusId: 0,

    })


  }



  getOutages(PageNumber: number, PageSize: number, searchValue: string, sortcolumn: string, sortcolumndir: string) {
    let params = new HttpParams();
    if (PageNumber !== null && PageSize !== null) {
      params = params.append('pageNumber', PageNumber.toString());
      params = params.append('pageSize', PageSize.toString());
      params = params.append('searchValue', searchValue.toString());
      params = params.append('sortcolumn', sortcolumn.toString());
      params = params.append('sortcolumndir', sortcolumndir.toString());
    }
    return this.http.get<any>(`${this.baseUrl}` + '/GetOutage', { observe: 'response', params }).pipe(
      map(response => {
        return response.body;
      })
    )
  }
  getAllDaily(PageNumber: number, PageSize: number, searchValue: string, sortcolumn: string, sortcolumndir: string) {
    let params = new HttpParams();
    if (PageNumber !== null && PageSize !== null) {
      params = params.append('pageNumber', PageNumber.toString());
      params = params.append('pageSize', PageSize.toString());
      params = params.append('searchValue', searchValue.toString());
      params = params.append('sortcolumn', sortcolumn.toString());
      params = params.append('sortcolumndir', sortcolumndir.toString());
    }
    return this.http.get<any>(`${this.baseUrl}` + '/GetAll', { observe: 'response', params }).pipe(
      map(response => {
        return response.body;
      })
    )
  }
  getOutageById(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/GetOutageById`, id);
  }
  insertOutage(data: Ioutage): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/AddOutage`, data);
  }
  updateOutage(data: Ioutage): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/UpdateOutage`, data);
  }

  deleteOutage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteOutage/` + id);
  }

  getListsForCreate(): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}` + `/getListForCreate`);
  }

  ExportEmptyExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/DownloadEmptyExcel`, { responseType: 'blob', headers: this.headers });

  }
  AdvancedSearch(searchModel: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/AdvancedSearch`, searchModel);
  }
  DeleteAttachFile(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/DeleteFile/` + id);
  }
  upload(file: any, id: Number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.baseUrl}/UploadedFile/` + id, formData);
  }
  DownloadAttach(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/DownloadFile/` + id);
  }
  GetFileByOutageId(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/GetFileByOutageId`, id);
  }
}
