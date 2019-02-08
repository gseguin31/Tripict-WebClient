import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public navBar: NavbarService,
              private translate: TranslateService) { }

  ngOnInit() {
  }

  switchLanguage() {
    if (this.translate.currentLang === 'fr'){
      this.translate.use('en');
    }
    else {
      this.translate.use('fr');
    }
    console.log(this.translate.currentLang);
  }

}
