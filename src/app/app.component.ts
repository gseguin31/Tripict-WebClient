import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientAngular';

  constructor (public http: HttpClient, private translate: TranslateService){
    translate.setDefaultLang('fr');
  }

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    };
  }

  testCall(){
    this.http.get('/api/values').subscribe(r => console.log(r));
  }
}
