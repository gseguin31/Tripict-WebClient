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
  currentlyUploading: boolean;
  ngOnInit() {
    this.navBar.show();

    this.posts = [];
    this.name = '';
    this.currentlyUploading = false;
  }


  // Envoie au serveur une activité avec le nom spécifié
  upload() {
    const trimmedName = this.name.trim();
    if (trimmedName.length <= 0 || trimmedName.length > 35) { // Vérifie qu'un nom est indiqué pour l'activité
      this.translate.get('app.alertActivityLength').subscribe((res: string) => {
        alert(res);
      });
      return;
    }
    this.currentlyUploading = true;
    let dto = new CreateActivityDto(trimmedName, this.apiService.currentTrip);
    this.apiService.addActivity(dto).subscribe((r) => {
        this.currentlyUploading = false;
        this.translate.get('app.alertActivityCreate').subscribe((res: string) => {
          alert(res);
          this.dialogRef.close();
        });
      },
      (e) => {
        this.currentlyUploading = false;
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
