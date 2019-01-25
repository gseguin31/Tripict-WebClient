import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../assets/Models/post';
import {CreatePostDTO} from '../assets/Models/DTO/create-post-dto';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(public http: HttpClient) { }

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    };
  }

  addPost(post: Post): void{
    let dto = post.toCreatePostDTO(post);
    this.http.post('/api/Post/createPost', dto, this.getOptions()).subscribe();
  }
}
