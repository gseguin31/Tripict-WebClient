import {Component, OnInit, ViewChild} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {Post} from '../Models/post';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavbarService} from '../Services/navbar.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {

  constructor(public http: WebApiService,
              public modalService: NgbModal,
              public navBar: NavbarService,
              private route: ActivatedRoute) {
  }

  public isLoading = true;
  public allPostsFromServer = [];


  ngOnInit() {

    let activityId = this.route.snapshot.paramMap.get('activityId');
    let id = +activityId;
    this.navBar.show();
    // t mettre pour recuperer seulement d'une activité
     /*this.http.getPostForActivity(id de lactivité).subscribe(r => {
       // console.log(r);
       this.isLoading = false;
       this.allPostsFromServer = r;
     });*/


    this.http.getPostForActivity(id).subscribe(r => {
      this.isLoading = false;
      this.allPostsFromServer = r;
    });
  }

  open(content) {
    this.modalService.open(content, { centered: true }).result;
  }
}
