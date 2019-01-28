import { Component, OnInit } from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(public apiService: WebApiService, private  route: ActivatedRoute) { }

  ngOnInit() {
  }

  upload(){

  }
}
