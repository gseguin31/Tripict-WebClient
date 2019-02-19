import {Component, Inject, OnInit} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogData} from '../interfaces/dialog-data';
import {NavbarService} from '../Services/navbar.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import {UserSearchResultDto} from '../Models/DTO/userSearchResultDto';
import {InviteUserToTripDto} from '../Models/DTO/invite-user-to-trip-dto';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.css']
})
export class FindUserComponent implements OnInit {

  constructor(public apiService: WebApiService,
              private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService,
              public navBar: NavbarService,
              public dialogRef: MatDialogRef<FindUserComponent>,
              private fb: FormBuilder) { }

  usersForm: FormGroup;
  filteredUsers: UserSearchResultDto[] = [];
  isLoading = false;
  userIdsToAdd = [];

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null
    });
    this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.apiService.findUsers(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => {
        this.filteredUsers = users;
      });
  }

  displayFn(user: UserSearchResultDto) {
    if (user) { return user.firstName + ' ' +  user.lastName + ' | ' + user.userName; }
  }

  add() {
    if (this.usersForm.get('userInput').value.userId !== undefined){
      let user = this.usersForm.get('userInput').value;
      if (this.userIdsToAdd.find(x => x.userId === user.userId) === undefined){
        this.userIdsToAdd.push(this.usersForm.get('userInput').value);
      }
    }
  }

  confirm() {
    let ids = [];
    for (let i of this.userIdsToAdd){
      ids.push(i.userId.toString());
    }
    let dto = new InviteUserToTripDto(ids, this.apiService.currentTrip);
    this.apiService.inviteUsers(dto).subscribe(r => {
      this.translate.get('app.UsersAddedSuccessful').subscribe((res: string) => {
        alert(res);
      });
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  beautifyName(user: UserSearchResultDto){
    return user.firstName + ', ' +  user.lastName + ' | ' + user.userName;
  }

  removeUserFromList(user) {
    this.userIdsToAdd = this.userIdsToAdd.filter(obj => obj !== user);
  }
}
