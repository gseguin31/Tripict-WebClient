import { Component, OnInit } from '@angular/core';
import {WebApiService} from '../Services/web-api.service';
import {ActivatedRoute} from '@angular/router';
import {CreatePostDTO} from '../Models/DTO/create-post-dto';
import {CreatePictureDto} from '../Models/DTO/create-picture-dto';
import {forEach} from '@angular/router/src/utils/collection';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-post',
  templateUrl: './createPost.component.html',
  styleUrls: ['./createPost.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(public apiService: WebApiService, private  route: ActivatedRoute, private translate: TranslateService) { }
  public imagePath;

  text: string;
  pictureURLS: string[];

  ngOnInit() {
    this.pictureURLS = [];
    this.text = '';
  }

  upload() {
    let lstPictureDto: CreatePictureDto[];
    lstPictureDto = [];
    for (let i = 0; i < this.pictureURLS.length; i++){
      lstPictureDto.push(new CreatePictureDto(this.pictureURLS[i]));
    }
    if (this.pictureURLS.length === 0 && this.text === '') {
      this.translate.get('app.alertPostCreate').subscribe((res: string) => {
        alert(res);
      });
      return;
    }
    let p: CreatePostDTO = new CreatePostDTO(this.text, lstPictureDto, 0);
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
        this.translate.get('app.alertImage').subscribe((res: string) => {
          alert(res);
        });
        return;
      }

      let readerFor = new FileReader();
      readerFor.readAsDataURL(files[i]);

      readerFor.onload = (event) => {
        this.pictureURLS.push((<any>readerFor.result));
        console.log(this.pictureURLS);
      };
    }
  }
}
