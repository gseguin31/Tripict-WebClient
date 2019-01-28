import { Component, OnInit } from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../assets/Models/post';
import {Activity} from '../assets/Models/activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(public apiService: WebApiService, private  route: ActivatedRoute) { }

  name: string;
  posts: Post[];

  ngOnInit() {
    this.posts = [];
  }

  /*upload(){
    let a: Activity = new Activity(this.name, this.apiService.currentTrip, this.posts);
    console.log(a);
    this.apiService.addPost(a);
  }*/
}
