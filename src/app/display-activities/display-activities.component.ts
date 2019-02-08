import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DisplayActivityDto} from '../Models/DTO/display-activity-dto';
import {NavbarService} from '../Services/navbar.service';

@Component({
  selector: 'app-display-activities',
  templateUrl: './display-activities.component.html',
  styleUrls: ['./display-activities.component.css']
})
export class DisplayActivitiesComponent implements OnInit {

  constructor(public apiService: WebApiService, private  route: ActivatedRoute, private translate: TranslateService, private router: Router, public navBar: NavbarService) { }

  activities: DisplayActivityDto[];

  ngOnInit() {
    this.navBar.show();
    this.activities = [];
    this.apiService.getActivitiesForTrip(this.apiService.currentTrip).subscribe(r => {
      for (let i = 0; i < r.length; i++){
        this.activities.push(r[i]);
      }
    });
  }

  moveToPosts(activityId: number, activityName: string) {
    this.apiService.currentActivity = activityId;
    this.router.navigateByUrl('/a/' + activityName + '/posts');
  }
}
