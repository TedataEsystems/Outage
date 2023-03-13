import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProblemLocationService {

  baseUrl = `${environment.apiUrl}ProblemLocation`;
  constructor(private httpClient: HttpClient) { }

  getProblemLocation(PageNumber: number, PageSize: number, searchValue: string, sortcolumn: string, sortcolumndir: string) {
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

  addProblemLocation(model: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/AddProblemLocation`, model);
  }
  updateProblemLocation(model: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/UpdateProblemLocation`, model
    );
  }
  deleteProblemLocation(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/DeleteProblemLocation/` + id);
  }
  isNameRepeated(name: string, id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/IsNameRepeated/` + name + `/` + id);
  }
}
