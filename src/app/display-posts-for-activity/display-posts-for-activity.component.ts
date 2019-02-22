import {Component, OnInit, ViewChild} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {Post} from '../Models/post';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavbarService} from '../Services/navbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CreateActivityComponent} from '../create-activity/create-activity.component';
import {CreatePostComponent} from '../createPost/createPost.component';
import {MatDialog} from '@angular/material';
import {DisplayPostDetailsComponent} from '../display-post-details/display-post-details.component';
import {FindUserComponent} from '../find-user/find-user.component';
import {PostDto} from '../Models/DTO/post-dto';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-posts-for-activity.component.html',
  styleUrls: ['./display-posts-for-activity.component.css']
})
export class DisplayPostsForActivityComponent implements OnInit {

  constructor(public http: WebApiService,
              public modalService: NgbModal,
              public navBar: NavbarService,
              private route: ActivatedRoute,
              public router: Router,
              private translate: TranslateService,
              private dialog: MatDialog) {
  }

  public isLoading = true;
  public noAccess = false;
  public noActivity = false;
  public allPostsFromServer = [];
  // public prefix = 'http://localhost:52090/';

  // public prefix = 'http://e1-test.projet.college-em.info:8080/';


  ngOnInit() {

    let activityId = +this.route.snapshot.paramMap.get('activityId');
    let tripId = +this.route.snapshot.paramMap.get('tripId');
    // let id = +activityId;
    this.http.currentActivity = activityId;
    this.http.currentTrip = tripId;
    this.navBar.show();

    this.getPosts();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '70%',
      // maxWidth: '50em',
      minWidth: '20em'
    });

    // Rafraichit la liste après la fermeture du dialogue
    dialogRef.afterClosed().subscribe(r => {
      this.getPosts();
    });
  }

  openPostDetails(post: PostDto) {
    const dialogRef = this.dialog.open(DisplayPostDetailsComponent, {
      width: '70%',
      data: { currentPost: post },
    });
  }

  createPost() {
    let tripId = this.route.snapshot.paramMap.get('tripId');
    let activityId = this.route.snapshot.paramMap.get('activityId');
    this.router.navigateByUrl('trip/' + tripId + '/activity/' + activityId + '/create-post');
  }

  wasSeen(id) {
    this.http.postWasSeen(id);
    this.getPosts();
  }

  getPosts() {
    this.resetErrorMessages();
    let activityId = this.route.snapshot.paramMap.get('activityId');
    let id = +activityId;
    this.http.getPostForActivity(id).subscribe(r => {
        this.isLoading = false;
        this.allPostsFromServer = r;
      },
      e => {
        if (e.status === 401) {
          this.router.navigateByUrl('/login');
        }
        if (e.status === 400) {
          this.isLoading = false;
          this.noActivity = true;
        }
        if (e.status === 403) {
          this.isLoading = false;
          this.noAccess = true;
        }
      });
  }

  resetErrorMessages() {
    this.isLoading = true;
    this.noAccess = false;
    this.noActivity = false;
  }
}
