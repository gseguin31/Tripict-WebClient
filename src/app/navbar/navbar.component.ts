import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../Services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public navBar: NavbarService) { }

  ngOnInit() {
  }

}
