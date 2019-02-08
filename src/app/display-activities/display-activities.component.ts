import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DisplayActivityDto} from '../Models/DTO/display-activity-dto';
import {NavbarService} from '../Services/navbar.service';
import {MatDialog} from '@angular/material';
import {CreateActivityComponent} from '../create-activity/create-activity.component';

@Component({
  selector: 'app-display-activities',
  templateUrl: './display-activities.component.html',
  styleUrls: ['./display-activities.component.css']
})

export class DisplayActivitiesComponent implements OnInit {

  constructor(public apiService: WebApiService,
              private  route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router,
              public navBar: NavbarService,
              private dialog: MatDialog) {
  }

  activities: DisplayActivityDto[];

  ngOnInit() {
    this.navBar.show();
    this.activities = [];
    /*this.apiService.getActivitiesForTrip(this.apiService.currentTrip).subscribe(r => {
      for (let i = 0; i < r.length; i++){
        this.activities.push(r[i]);
      }
    });*/
    for (let i = 0; i < 5; i++) {
      let act = new DisplayActivityDto(i, 'Spradarajan ' + i);
      this.activities.push(act);
    }
    console.log(this.activities);
  }

  moveToPosts(activityId: number, activityName: string) {
    this.apiService.currentActivity = activityId;
    this.router.navigateByUrl('/a/' + activityName + '/posts');
  }

  showActivity(a: DisplayActivityDto) {
    console.log(a);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateActivityComponent, {
      width: '40%',
      maxWidth: '50em',
      minWidth: '20em'
    });
  }
}
