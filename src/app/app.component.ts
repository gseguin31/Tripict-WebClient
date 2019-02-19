import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {conditionallyCreateMapObjectLiteral} from '@angular/compiler/src/render3/view/util';
import {compareLogSummaries} from '@angular/core/src/render3/styling/class_and_style_bindings';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientAngular';

  constructor (public http: HttpClient,
               private translate: TranslateService,
               private route: ActivatedRoute){
    translate.setDefaultLang('fr');
    this.translate.use('fr');
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

  // Change la langue entre le français et l'anglais
  switchLanguage() {
    if (this.translate.currentLang === 'fr'){
      this.translate.use('en');
    }
    else {
      this.translate.use('fr');
    }
  }
}
