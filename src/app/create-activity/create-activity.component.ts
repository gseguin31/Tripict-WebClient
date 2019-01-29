import { Component, OnInit } from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../assets/Models/post';
import {Activity} from '../../assets/Models/activity';

@Component({
  selector: 'app-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  constructor(public apiService: WebApiService, private  route: ActivatedRoute) { }

  name: string;
  posts: Post[];

  ngOnInit() {
    this.posts = [];
  }

  upload(){
    let a: Activity = new Activity(this.name, this.apiService.currentTrip, this.posts);
    console.log(a);
    this.apiService.addActivity(a);
  }
}
