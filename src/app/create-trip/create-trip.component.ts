import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WebApiService} from '../Services/web-api.service';
import {NavbarService} from '../Services/navbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogData} from '../interfaces/dialog-data';
import {TranslateService} from '@ngx-translate/core';
import {CreateActivityComponent} from '../create-activity/create-activity.component';
import {CreateActivityDto} from '../Models/DTO/create-activity-dto';
import {CreateTripDto} from '../Models/DTO/create-trip-dto';
import {DisplayTripDto} from '../Models/DTO/display-trip-dto';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  constructor(public apiService: WebApiService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              public navBar: NavbarService,
              public dialogRef: MatDialogRef<CreateTripComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  name: string;

  ngOnInit() {
    this.navBar.show();
    this.name = '';
  }

  upload() {
    const trimmedName = this.name.trim();
    if (trimmedName.length <= 0 || trimmedName.length > 35) { // Validation de longueur du nom du voyage
      this.translate.get('app.alertTripLength').subscribe((res: string) => {
        alert(res);
      });
      return;
    }

    let dto = new CreateTripDto(trimmedName);
    this.apiService.addTrip(dto).subscribe((r) => {
        this.translate.get('app.alertTripCreate').subscribe((res: string) => {
          alert(res);
          this.dialogRef.close();
        });
      },
      (e) => {
        if (e.status === 401) { // Code 401 si la page est atteinte directement sans être connecté
          this.router.navigateByUrl('/login');
          this.dialogRef.close();
        }
      });
  }

  cancel() {
    this.dialogRef.close();
  }

}
