import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WebApiService} from '../Services/web-api.service';
import {NavbarService} from '../Services/navbar.service';
import {ActivatedRoute} from '@angular/router';
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
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  name: string;

  ngOnInit() {
    this.navBar.show();

  }

  upload() {
    if (this.name.length <= 0) {
      this.translate.get('app.alertTripLength').subscribe((res: string) => {
        alert(res);
      });
      return;
    }

    let dto = new CreateTripDto(this.name);
    this.apiService.addTrip(dto).subscribe((r) => {
        this.translate.get('app.alertTripCreate').subscribe((res: string) => {
          alert(res);
          this.dialogRef.close();
        });
      },
      (e) => {
        this.translate.get('app.alertGenericApiError').subscribe((res: string) => {
          alert(res);
        });
      });
  }

  cancel() {
    this.dialogRef.close();
  }

}
