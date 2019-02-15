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
              private route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router,
              public navBar: NavbarService,
              private dialog: MatDialog) {
  }

  activities: DisplayActivityDto[];
  loading = true;
  tripTitle = '';

  ngOnInit() {
    this.navBar.show();
    this.activities = [];
    this.apiService.currentTrip = this.route.snapshot.paramMap.get('tripId') as any;
    this.getTripTitle(this.apiService.currentTrip);
    this.showActivities();
    console.log(this.activities);
  }

  moveToPosts(id: number, name: string) {
    this.apiService.currentActivity = id;
    let tripId = this.route.snapshot.paramMap.get('tripId');
    this.router.navigateByUrl('trip/' + tripId + '/activity/' + id + '/posts');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateActivityComponent, {
      width: '40%',
      maxWidth: '50em',
      minWidth: '20em'
    });

    dialogRef.afterClosed().subscribe(r => {
      this.showActivities();
    });
  }

  getTripTitle(tripId: number) {
    this.apiService.getTripById(tripId).subscribe(r => {
      this.tripTitle = r.name;
    });
  }

  showActivities() {
    this.apiService.getActivitiesForTrip(this.apiService.currentTrip).subscribe(r => {
        this.loading = false;
        this.activities = [];
        for (let i = 0; i < r.length; i++) {
          this.activities.push(r[i]);
        }
      },
      e => {
        if (e.status === 401) {
          this.router.navigateByUrl('/login');
        }
      });
  }
}
