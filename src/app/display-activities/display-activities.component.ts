import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-display-activities',
  templateUrl: './display-activities.component.html',
  styleUrls: ['./display-activities.component.css']
})
export class DisplayActivitiesComponent implements OnInit {

  constructor(public apiService: WebApiService, private  route: ActivatedRoute, private translate: TranslateService, private router: Router) { }

  ngOnInit() {
  }

}
