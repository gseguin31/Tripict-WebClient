import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../Services/navbar.service';
import {WebApiService} from '../Services/web-api.service';
import {CreateUserDto} from '../Models/DTO/create-user-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  viewRegister = false;

  constructor(public http: WebApiService, public navBar: NavbarService) { }

  ngOnInit() {
    this.navBar.hide();
  }

  toggleRegister() {
    this.viewRegister = !this.viewRegister;
  }

  register(){
    this.http.createUser(new CreateUserDto('a', 'b', 'c', 'd'))
      .subscribe(

    );
  }
}
