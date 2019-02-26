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
  newTrips: DisplayTripDto[];
  loading = true;

  ngOnInit() {
    this.navBar.show();
    this.trips = [];
    this.newTrips = [];
    this.showTrips();

  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);

  }

  // Redirige vers le component d'affichage d'activités en spécifiant le voyage
  moveToActivities(tripId: number, name: string) {
    this.apiService.currentTrip = tripId;
    this.router.navigateByUrl('trip/' + tripId + '/activities');
  }

  // Ouvre le component de création de voyage
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTripComponent, {
      width: '40%',
      maxWidth: '50em',
      minWidth: '20em'
    });

    // Rafraichit la liste après la fermeture du dialogue
    dialogRef.afterClosed().subscribe(r => {
      this.showTrips();
    });
  }

  // Affiche la liste des voyages pour l'utilisateur
  public showTrips() {
    this.apiService.getTripsForUser().subscribe(r => {
        this.loading = false; // Cache la bannière à la fin du chargement
        this.trips = [];
        this.newTrips = [];
        for (let i = 0; i < r.length; i++) {
          let trip = new DisplayTripDto(r[i].id, r[i].name, r[i].seen, r[i].latitude, r[i].longitude);
          // console.log(trip);
          if (trip.seen) { // Trie les voyages en fonction de si l'utilisateur les as déjà vus ou non
            this.trips.push(trip);
          } else {
            this.newTrips.push(trip);
          }
        }
      },
      e => {
        // if (e.status === 401) { // Code 401 si la page est atteinte directement sans être connecté
          this.router.navigateByUrl('/login');
        // }
      });
  }
}
