import { Component, OnInit } from '@angular/core';
import {Picture} from '../assets/Models/picture';
import {WebApiService} from '../Services/web-api.service';
import {Post} from '../assets/Models/post';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public apiService: WebApiService, private  route: ActivatedRoute) { }

  text: string;
  pictures: Picture[];

  ngOnInit() {
  }

  upload() {
    let p: Post = new Post(this.text, this.pictures, this.apiService.currentActivity)
    this.apiService.addPost(p);
  }

}
