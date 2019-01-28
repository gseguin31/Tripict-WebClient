import { Component, OnInit } from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {Post} from '../assets/Models/post';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {

  constructor(public http: WebApiService) { }

  public allPosts: Post[];
  ngOnInit() {
    // a changer pour une activité
    this.http.getPostForUser().subscribe(r => this.allPosts = r);
  }

}
