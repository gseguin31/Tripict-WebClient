import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../Models/post';
import {CreatePostDTO} from '../Models/DTO/create-post-dto';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Activity} from '../Models/activity';
import {PostDTO} from '../Models/DTO/post-dto';
import {CreateActivityDto} from '../Models/DTO/create-activity-dto';

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

  addPost(post: CreatePostDTO): void{
    this.http.post('api/Post/CreatePost', post, this.getOptions()).subscribe();
  }

  addActivity(activity: CreateActivityDto): void{
    // let dto = activity.toCreateActivityDTO(activity);
    this.http.post('api/Activity/createActivity', activity, this.getOptions()).subscribe();
  }

  getPostForUser(): Observable<PostDTO[]>{
    return this.http.get('api/Posts?', this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }

  getPostForActivity(activityId: number): Observable<PostDTO[]>{
    return this.http.get('/api/Posts/GetPostsForActivity?id=' + activityId, this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }
}
