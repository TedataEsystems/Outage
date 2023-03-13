import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from 'src/app/model/Iuser';
import { Login } from 'src/app/model/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = `${environment.apiUrl}Account`;

  constructor(private http: HttpClient) { }

  login(data: Login): Observable<Iuser> {
    return this.http.post<Iuser>(`${this.baseUrl}/login`, data);
  }


  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Logout`);
  }
}
