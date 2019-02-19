import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {NavbarService} from '../Services/navbar.service';
import {FindUserComponent} from '../find-user/find-user.component';
import {ActivatedRoute, Router} from '@angular/router';
import {WebApiService} from '../Services/web-api.service';
import {UserSearchResultDto} from '../Models/DTO/userSearchResultDto';

@Component({
  selector: 'app-invited-users',
  templateUrl: './invited-users.component.html',
  styleUrls: ['./invited-users.component.css']
})
export class InvitedUsersComponent implements OnInit {

  constructor(public apiService: WebApiService,
              public navBar: NavbarService,
              public dialogRef: MatDialogRef<InvitedUsersComponent>) { }



  usersInTrip = [];
  ngOnInit() {
    this.apiService.getUsersForTrip(this.apiService.currentTrip).subscribe(r => this.usersInTrip = r);
  }

  beautifyName(user: UserSearchResultDto){
    return user.firstName + ', ' +  user.lastName + ' | ' + user.userName;
  }

  cancel() {
    this.dialogRef.close();
  }

}
