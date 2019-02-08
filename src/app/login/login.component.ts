import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../Services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  viewRegister = false;

  constructor(public navBar: NavbarService) { }

  ngOnInit() {
    this.navBar.hide();
  }

  toggleRegister() {
    this.viewRegister = !this.viewRegister;
  }
}
