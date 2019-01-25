import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../assets/Models/post';
import {CreatePostDTO} from '../assets/Models/DTO/create-post-dto';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(public http: HttpClient) { }

  public currentActivity: number;
  public currentTrip: number;

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

  getPostForUser(): Observable<Post[]>{
    return this.http.get('/api/Post/GetPostForUser', this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }

  getPostForActivity(activityId: number): Observable<Post[]>{
    return this.http.get('/api/Post/getPostForActivity', this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }
}
