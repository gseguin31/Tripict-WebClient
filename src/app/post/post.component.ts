import { Component, OnInit } from '@angular/core';
import {Picture} from '../assets/Models/picture';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  text: string;
  picture: Picture;

  ngOnInit() {
  }

  upload() {

  }

}
