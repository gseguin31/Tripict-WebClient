import {Component, OnInit} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {NavbarService} from '../Services/navbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {DisplayTripDto} from '../Models/DTO/display-trip-dto';
import {CreateActivityComponent} from '../create-activity/create-activity.component';
import {CreateTripComponent} from '../create-trip/create-trip.component';

@Component({
  selector: 'app-display-trip',
  templateUrl: './display-trip.component.html',
  styleUrls: ['./display-trip.component.css']
})
export class DisplayTripComponent implements OnInit {

  constructor(public apiService: WebApiService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router,
              public navBar: NavbarService,
              private dialog: MatDialog) {
  }

  trips: DisplayTripDto[];

  ngOnInit() {
    this.navBar.show();
    this.trips = [];
    this.showTrips();
    // Temporaire, en attendant l'API
    /*for (let i = 0; i < 5; i++) {
      let act = new DisplayTripDto(i, 'Spradarajan voyage ' + i);
      this.trips.push(act);
    }*/
  }

  moveToActivities(tripId: number, name: string) {
    this.apiService.currentTrip = tripId;
    console.log(tripId);
    this.router.navigateByUrl(name + '/activities');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTripComponent, {
      width: '40%',
      maxWidth: '50em',
      minWidth: '20em'
    });

    dialogRef.afterClosed().subscribe( r => {
      this.showTrips();
    });
  }

  public showTrips(){
    this.apiService.getTripsForUser().subscribe( r => {
      this.trips = [];
      for (let i = 0; i < r.length; i++){
        let trip = new DisplayTripDto(r[i].id, r[i].name);
        this.trips.push(trip);
        console.log(this.trips);
      }
    });
  }
}
