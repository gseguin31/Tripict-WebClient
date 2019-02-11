import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../Models/post';
import {CreatePostDTO} from '../Models/DTO/create-post-dto';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Activity} from '../Models/activity';
import {PostDTO} from '../Models/DTO/post-dto';
import {CreateActivityDto} from '../Models/DTO/create-activity-dto';
import {CreatePictureDto} from '../Models/DTO/create-picture-dto';
import {DisplayActivityDto} from '../Models/DTO/display-activity-dto';
import {DisplayTripDto} from '../Models/DTO/display-trip-dto';
import {CreateTripDto} from '../Models/DTO/create-trip-dto';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(public http: HttpClient) { }

  public currentActivity: number;
  public currentTrip: number;

  // public baseUrl = 'http://e1-test.projet.college-em.info:8080/';
   public baseUrl = 'http://localhost:52090/';

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    };
  }

  addPost(post: CreatePostDTO): Observable<number> {
    return this.http.post(this.baseUrl + 'api/Post/CreatePost', post, this.getOptions()) as any;
  }

  addPicture(pic: CreatePictureDto): Observable<Response> {
    return this.http.post(this.baseUrl + 'api/Picture/CreatePicture', pic, this.getOptions()) as any;
  }

  addActivity(activity: CreateActivityDto): Observable<Response>{
    // let dto = activity.toCreateActivityDTO(activity);
    return this.http.post(this.baseUrl + 'api/Activity/createActivity', activity, this.getOptions()) as any;
  }

  addTrip(trip: CreateTripDto): Observable<Response>{
    return this.http.post(this.baseUrl + 'api/Trip/createTrip', trip, this.getOptions()) as any;
  }

  getActivitiesForTrip(tripId: number): Observable<DisplayActivityDto[]>{
    return this.http.get(this.baseUrl + 'api/Activity/getActivitiesForTrip?id=' + tripId, this.getOptions()).pipe(map( r => {
      return r as any;
    }));
  }

  getTripsForUser(): Observable<DisplayTripDto[]>{
    return this.http.get(this.baseUrl + 'api/Trip/getTripsForUser', this.getOptions()).pipe(map( r => {
      return r as any;
    }));
  }

  getPostForUser(): Observable<PostDTO[]>{
    return this.http.get(this.baseUrl + 'api/Posts', this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }

  getPostForActivity(activityId: number): Observable<PostDTO[]>{
    return this.http.get(this.baseUrl + '/api/Posts/GetPostsForActivity/' + activityId, this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }
}
