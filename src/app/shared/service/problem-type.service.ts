import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProblemTypeService {

  baseUrl = `${environment.apiUrl}ProblemType`;
  constructor(private httpClient: HttpClient) { }

  getProblemType(PageNumber: number, PageSize: number, searchValue: string, sortcolumn: string, sortcolumndir: string) {
    let params = new HttpParams();
    if (PageNumber !== null && PageSize !== null) {
      params = params.append('pageNumber', PageNumber.toString());
      params = params.append('pageSize', PageSize.toString());
      params = params.append('searchValue', searchValue.toString());
      params = params.append('sortcolumn', sortcolumn.toString());
      params = params.append('sortcolumndir', sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${this.baseUrl}`, { observe: 'response', params }).pipe(
      map(response => {
        return response.body;
      })
    )
  }

  addProblemType(model: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/AddProblemType`, model);
  }
  updateProblemType(model: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/UpdateProblemType`, model
    );
  }
  deleteProblemType(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/DeleteProblemType/` + id);
  }
  isNameRepeated(name: string, id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/IsNameRepeated/` + name + `/` + id);
  }
}
