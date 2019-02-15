import {Component, Inject, OnInit} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../Models/post';
import {Activity} from '../Models/activity';
import {CreateActivityDto} from '../Models/DTO/create-activity-dto';
import {TranslateService} from '@ngx-translate/core';
import {NavbarService} from '../Services/navbar.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../interfaces/dialog-data';

@Component({
  selector: 'app-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  constructor(public apiService: WebApiService,
              private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService,
              public navBar: NavbarService,
              public dialogRef: MatDialogRef<CreateActivityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  name: string;
  posts: Post[];

  ngOnInit() {
    this.navBar.show();

    this.posts = [];
    this.name = '';
  }

  upload() {
    const trimmedName = this.name.trim();
    if (trimmedName.length <= 0 || trimmedName.length > 35) { // Vérifie qu'un nom est indiqué pour l'activité
      this.translate.get('app.alertActivityLength').subscribe((res: string) => {
        alert(res);
      });
      return;
    }

    let dto = new CreateActivityDto(trimmedName, this.apiService.currentTrip);
    this.apiService.addActivity(dto).subscribe((r) => {
        this.translate.get('app.alertActivityCreate').subscribe((res: string) => {
          alert(res);
          this.dialogRef.close();
        });
      },
      (e) => {
        if (e.status === 409) {
          this.translate.get('app.alertActivityCreateName').subscribe((res: string) => {
            alert(res);
          });
        }
        else {
          if (e.status === 401) {
            this.router.navigateByUrl('/login');
          }
          this.translate.get('app.alertGenericApiError').subscribe((res: string) => {
            alert(res);
          });
        }
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
