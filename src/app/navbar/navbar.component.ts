import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';
import {TranslateService} from '@ngx-translate/core';
import {WebApiService} from '../Services/web-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public navBar: NavbarService,
              private translate: TranslateService,
              private http: WebApiService,
              private router: Router) { }

  ngOnInit() {
  }


  // Gère le passage du français à l'anglais par le bouton de la navbar
  switchLanguage() {
    if (this.translate.currentLang === 'fr'){
      this.translate.use('en');
    }
    else {
      this.translate.use('fr');
    }
  }

  // Déconnecte l'utilisateur
  signout(){
    this.http.signout().subscribe(r => {
      localStorage.removeItem('Token');
      this.router.navigateByUrl('/login');
    });
  }


  home() {
    this.router.navigateByUrl('/');
  }
}
