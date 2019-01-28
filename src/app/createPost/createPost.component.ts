import { Component, OnInit } from '@angular/core';
import {Picture} from '../assets/Models/picture';
import {WebApiService} from '../Services/web-api.service';
import {Post} from '../assets/Models/post';
import {ActivatedRoute} from '@angular/router';
import {stringify} from 'querystring';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CreatePostDTO} from '../assets/Models/DTO/create-post-dto';


@Component({
  selector: 'app-post',
  templateUrl: './createPost.component.html',
  styleUrls: ['./createPost.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(public apiService: WebApiService, private  route: ActivatedRoute) { }
  public imagePath;

  text: string;
  pictures: File[];
  pictureURLS: String[];

  ngOnInit() {
    this.pictures = [];
    this.pictureURLS = [];
    this.text = '';
  }

  upload() {
    let p: CreatePostDTO = new CreatePostDTO(this.text, this.pictureURLS, 0/*this.apiService.currentActivity*/);
    console.log(p);
    this.apiService.addPost(p);
  }

  // Ajoute les images sélectionnées à la liste, vérifie que tout ce qui est choisi est une image et affiche les images dans la page
  previewImage(files) {
    if (files.length === 0){
      return;
    }

    this.imagePath = files;

    for (let i = 0; i < files.length; i++) {
      let mimeType = files[i].type;
      if (mimeType.match(/image\/*/) == null) {
        alert('The file you choose must be an image');
        return;
      }

      // this.pictures.push(files[i]);
      let readerFor = new FileReader();
      readerFor.readAsDataURL(files[i]);
      readerFor.onload = (event) => {
        this.pictureURLS.push((<any>readerFor.result));
        console.log(this.pictureURLS);
      };
    }
  }/*
  toByteArray(s: string) {
    let BASE64_MARKER = ';base64,';

    function convertDataURIToBinary(dataURI) {
      let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      let base64 = dataURI.substring(base64Index);
      let raw = window.atob(base64);
      let rawLength = raw.length;
      let array = new Uint8Array(new ArrayBuffer(rawLength));

      for (i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }
  }*/
}
