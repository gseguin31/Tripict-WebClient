import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DisplayActivityDto} from '../Models/DTO/display-activity-dto';
import {NavbarService} from '../Services/navbar.service';
import {MatDialog} from '@angular/material';
import {CreateActivityComponent} from '../create-activity/create-activity.component';
import {FindUserComponent} from '../find-user/find-user.component';
import {InvitedUsersComponent} from '../invited-users/invited-users.component';

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
  noAccess = false;
  tripTitle = '';

  ngOnInit() {
    this.navBar.show();
    this.activities = [];
    this.apiService.currentTrip = this.route.snapshot.paramMap.get('tripId') as any;
    this.getTripTitle(this.apiService.currentTrip);
    this.showActivities();
  }

  // Redirige vers la liste des posts d'une activité
  moveToPosts(id: number, name: string) {
    this.apiService.currentActivity = id;
    let tripId = this.route.snapshot.paramMap.get('tripId');
    this.router.navigateByUrl('trip/' + tripId + '/activity/' + id + '/posts');
  }

  // Ouvre le component de création d'activité
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateActivityComponent, {
      width: '40%',
      maxWidth: '50em',
      minWidth: '20em'
    });

    // Rafraichit la liste après la fermeture du dialogue
    dialogRef.afterClosed().subscribe(r => {
      this.showActivities();
    });
  }

  // Utilisé pour afficher le nom du voyage
  getTripTitle(tripId: number) {
    this.apiService.getTripById(tripId).subscribe(r => {
      this.tripTitle = r.name;
    });
  }

  showActivities() {
    this.apiService.getActivitiesForTrip(this.apiService.currentTrip).subscribe(r => {
        this.loading = false; // Cache la bannière lorsque le chargement est fini
        this.activities = [];
        for (let i = 0; i < r.length; i++) {
          this.activities.push(r[i]);
        }
      },
      e => {
        this.loading = false;
        if (e.status === 401) { // Code 401 si la page est atteinte directement sans être connecté
          this.router.navigateByUrl('/login');
        } else if (e.status === 403) { // Code 401 si la page est atteinte directement avec un mauvais id
          this.noAccess = true;
        }
      });
  }

  openFindUser() {
    const dialogRef = this.dialog.open(FindUserComponent, {
      width: '40%',
      maxWidth: '50em',
      minWidth: '20em'
    });

    dialogRef.afterClosed().subscribe(r => {
      this.showActivities();
    });
  }

  openInvitedUsers() {
    const dialogRef = this.dialog.open(InvitedUsersComponent, {
      width: '40%',
      maxWidth: '50em',
      minWidth: '20em'
    });

    dialogRef.afterClosed().subscribe(r => {
      this.showActivities();
    });
  }
}
