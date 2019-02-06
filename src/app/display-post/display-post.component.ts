import {Component, OnInit, ViewChild} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {Post} from '../Models/post';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {

  constructor(public http: WebApiService, public modalService: NgbModal) {
  }

  public isLoading = true;
  public allPosts = [];
  public allPostsFromServer = [];
  imagesPost1 = [];
  imagesPost2 = [];


  ngOnInit() {
    // a mettre pour recuperer seulement d'une activité
     /*this.http.getPostForActivity(id de lactivité).subscribe(r => {
       // console.log(r);
       this.isLoading = false;
       this.allPostsFromServer = r;
     });*/

     // appel temporaire pour tester et recevoir toute les post
    this.http.getPostForUser().subscribe(r => {
      // console.log(r);
      this.isLoading = false;
      this.allPostsFromServer = r;
    });
  }

  open(content) {
    this.modalService.open(content, { centered: true }).result;
  }
}
