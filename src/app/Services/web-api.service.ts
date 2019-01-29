import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../../assets/Models/post';
import {CreatePostDTO} from '../../assets/Models/DTO/create-post-dto';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Activity} from '../../assets/Models/activity';

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

  addActivity(activity: Activity): void{
    let dto = activity.toCreateActivityDTO(activity);
    this.http.post('/api/Activity/createActivity', dto, this.getOptions()).subscribe();
  }

  getPostForUser(): Observable<Post[]>{
    return this.http.get('api/Posts', this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }

  getPostForActivity(activityId: number): Observable<Post[]>{
    return this.http.get('/api/Post/getPostForActivity?id=' + activityId, this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }
}
