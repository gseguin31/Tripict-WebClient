import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(public http: HttpClient) { }

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    };
  }

  
}
