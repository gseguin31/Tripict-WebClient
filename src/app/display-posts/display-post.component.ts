import {Component, OnInit, ViewChild} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {Post} from '../Models/post';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavbarService} from '../Services/navbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {

  constructor(public http: WebApiService,
              public modalService: NgbModal,
              public navBar: NavbarService,
              private route: ActivatedRoute,
              public router: Router,
              private translate: TranslateService) {
  }

  public isLoading = true;
  public noAccess = false;
  public allPostsFromServer = [];
  public prefix = 'http://localhost:52090/';

  // public prefix = 'http://e1-test.projet.college-em.info:8080/';


  ngOnInit() {

    let activityId = this.route.snapshot.paramMap.get('activityId');
    let id = +activityId;
    this.navBar.show();

    this.getPosts();
  }

  open(content) {
    this.modalService.open(content, {centered: true}).result;
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

  getPosts(){
    this.isLoading = true;
    console.log("a");
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
        if (e.status === 403) {
          this.isLoading = false;
          this.noAccess = true;
        }
      });
  }
}
