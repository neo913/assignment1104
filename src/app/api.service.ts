import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
// import * from '../assets/UserInfo'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  apiUrl = "../assets/userInfo.json";

  getAPI(): Observable<HttpResponse<any>> {
    return this.http.get(this.apiUrl, {observe: 'response'});
  }
}
