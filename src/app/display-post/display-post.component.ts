import {Component, OnInit, ViewChild} from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {Post} from '../assets/Models/post';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {

  constructor(public http: WebApiService) {
  }

  public allPosts = [];
  public allPostsFromServer = [];
  imagesPost1 = [];
  imagesPost2 = [];

  ngOnInit() {
    // a changer pour une activité
     this.http.getPostForUser().subscribe(r => {
       this.allPostsFromServer = r;

     });


    this.imagesPost1[0] = '../../assets/images/trip1.jpg';
    this.imagesPost1[1] = '../../assets/images/trip2.jpg';
    this.imagesPost1[2] = '../../assets/images/trip3.jpg';
    this.imagesPost1[3] = '../../assets/images/trip4.jpg';
    this.allPosts[0] = new Post('Voici mon premier post Voici mon premier post   Voici mon premier postVoici mon premier post   Voici mon premier post v Voici mon premier post Voici mon premier post', this.imagesPost1, 0);

    this.imagesPost2[0] = '../../assets/images/trip4.jpg';
    this.imagesPost2[1] = '../../assets/images/trip5.jpg';
    this.allPosts[1] = this.imagesPost2;
    this.allPosts[1] = new Post('Voici mon deuxieme post', this.imagesPost2, 0);
  }

  readImages(files: any){
    let readerFor = new FileReader();
    readerFor.readAsDataURL(files);

    readerFor.onload = (event) => {
      this.allPostsFromServer.push((<any>readerFor.result));
      // console.log(this.pictureURLS);
    };
  }

}
