import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  
  baseUrl = `${environment.apiUrl}Dashboard`;
  constructor(private httpClient: HttpClient) { }

  chartData(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/GetflowChartData`);
  }
}
