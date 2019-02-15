import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post} from '../Models/post';
import {CreatePostDto} from '../Models/DTO/create-post-dto';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Activity} from '../Models/activity';
import {PostDto} from '../Models/DTO/post-dto';
import {CreateActivityDto} from '../Models/DTO/create-activity-dto';
import {CreatePictureDto} from '../Models/DTO/create-picture-dto';
import {DisplayActivityDto} from '../Models/DTO/display-activity-dto';
import {DisplayTripDto} from '../Models/DTO/display-trip-dto';
import {CreateTripDto} from '../Models/DTO/create-trip-dto';
import {CreateUserDto} from '../Models/DTO/create-user-dto';
import {SignedInUserDto} from '../Models/DTO/signed-in-user-dto';
import {LoginUserDto} from '../Models/DTO/login-user-dto';

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
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    };
  }

// Méthodes pour users --------------------------------------------------------------------
  createUser(user: CreateUserDto): Observable<SignedInUserDto> {
    return this.http.post(this.baseUrl + 'api/Account/Register', user, this.getOptions()) as any;
  }

  loginUser(user: LoginUserDto): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    const body = new HttpParams()
      .set('username', user.userName)
      .set('password', user.password)
      .set('grant_type', 'password');

    return this.http.post<any>('/api/Token', body.toString(), httpOptions);
  }



  // Méthodes pour posts --------------------------------------------------------------------
  addPost(post: CreatePostDto): Observable<number> {
    return this.http.post(this.baseUrl + 'api/Posts/CreatePost', post, this.getOptions()) as any;
  }

  getPostForUser(): Observable<PostDto[]>{
    return this.http.get(this.baseUrl + 'api/Posts', this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }
  getPostForActivity(activityId: number): Observable<PostDto[]>{
    return this.http.get(this.baseUrl + '/api/Posts/GetPostsForActivity/' + activityId, this.getOptions()).pipe(map(r => {
      return r as any;
    }));
  }



  // Méthodes pour pictures --------------------------------------------------------------------
  addPicture(pic: CreatePictureDto): Observable<Response> {
    return this.http.post(this.baseUrl + 'api/Pictures/CreatePicture', pic, this.getOptions()) as any;
  }



  // Méthodes pour Activities --------------------------------------------------------------------
  addActivity(activity: CreateActivityDto): Observable<Response>{
    // let dto = activity.toCreateActivityDTO(activity);
    console.log(this.currentTrip);
    console.log(activity);
    return this.http.post(this.baseUrl + 'api/Activities/createActivity', activity, this.getOptions()) as any;
  }

  getActivitiesForTrip(tripId: number): Observable<DisplayActivityDto[]>{
    return this.http.get(this.baseUrl + 'api/Activities/getActivitiesForTrip/' + tripId, this.getOptions()).pipe(map( r => {
      return r as any;
    }));
  }



  // Méthodes pour Trips --------------------------------------------------------------------
  addTrip(trip: CreateTripDto): Observable<Response>{
    return this.http.post(this.baseUrl + 'api/Trips/createTrip', trip, this.getOptions()) as any;
  }

  getTripsForUser(): Observable<DisplayTripDto[]>{
    return this.http.get(this.baseUrl + 'api/Trips/getTripsForUser', this.getOptions()).pipe(map( r => {
      return r as any;
    }));
  }
}
