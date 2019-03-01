import {Injectable} from '@angular/core';
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
import {UserSearchResultDto} from '../Models/DTO/userSearchResultDto';
import {LoginUserDto} from '../Models/DTO/login-user-dto';
import {forEach} from '@angular/router/src/utils/collection';
import {CommentDto} from '../Models/DTO/comment-dto';
import {CreateCommentDto} from '../Models/DTO/create-comment-dto';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(public http: HttpClient) {
  }

  public currentActivity: number;
  public currentTrip: number;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  // public baseUrl = 'http://e1-test.projet.college-em.info:8080/';
  //  public baseUrl = 'http://e1-dev.projet.college-em.info:8080/';
    public baseUrl = 'http://e1.projet.college-em.info:8080/';
    // public baseUrl = 'http://localhost:52090/';

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    };
  }


// Méthodes pour users --------------------------------------------------------------------
  createUser(user: CreateUserDto): Observable<UserSearchResultDto> {

    return this.http.post<UserSearchResultDto>(this.baseUrl + 'api/Account/Register', user, this.httpOptions); // as any;
  }

  signout(): Observable<any> {
    return this.http.post(this.baseUrl + 'api/Account/Logout', null, this.getOptions());
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

    return this.http.post<any>(this.baseUrl + 'api/Token', body.toString(), httpOptions);
  }

  checkAuthorisation(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/Account/UserInfo', this.getOptions()); // as any;
  }

  findUsers(tripId, search): Observable<any> {
    if (search.length === 0) {
      // mettre une chaine sinon le endpoint ne sera pas trouvé
      search = 'ijasdoifjasodjfasdkjf';
    }
    return this.http.get<any>(this.baseUrl + 'api/Account/FindUsers/' + tripId + '/' + search, this.getOptions()); /* .pipe(map(r => {
      return r as any;
    }));*/
  }

  inviteUsers(userIds): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Trips/InviteUserToTrip', userIds, this.getOptions());
  }

  getUsersForTrip(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Trips/GetUsersForTrip/' + id, this.getOptions());
  }

  getCurrentUserInfo(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Account/CurrentUser/', this.getOptions()).pipe(map(r => {
      return r;
    }));
  }



  // Méthodes pour posts --------------------------------------------------------------------
  addPost(post: CreatePostDto): Observable<number> {
    return this.http.post<any>(this.baseUrl + 'api/Posts/CreatePost', post, this.getOptions()); // as any;
  }

  getPostForUser(): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(this.baseUrl + 'api/Posts', this.getOptions()); /* .pipe(map(r => {
      return r as any;
    }));*/
  }

  getPostForActivity(activityId: number): Observable<PostDto[]> {
    return this.http.get<PostDto[]>(this.baseUrl + 'api/Posts/GetPostsForActivity/' + activityId, this.getOptions()); /* .pipe(map(r => {
      return r as any;
    }));*/
  }

  postWasSeen(id) {
    this.http.get(this.baseUrl + 'api/Posts/postWasSeen/' + id, this.getOptions()).subscribe(r => r);
  }

  getCommentsByPostId(id): Observable<CommentDto[]>{
    return this.http.get<CommentDto[]>(this.baseUrl + 'api/Comments/GetCommentsByPostId/' + id, this.getOptions());
  }

  createComment(comment: CreateCommentDto): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'api/Comments/CreateComment', comment, this.getOptions());
  }

  // Méthodes pour pictures --------------------------------------------------------------------
  addPicture(pic: CreatePictureDto): Observable<Response> {
    return this.http.post<any>(this.baseUrl + 'api/Pictures/CreatePicture', pic, this.getOptions()); // as any;
  }


  // Méthodes pour Activities --------------------------------------------------------------------
  addActivity(activity: CreateActivityDto): Observable<Response> {
    // let dto = activity.toCreateActivityDTO(activity);
    return this.http.post<any>(this.baseUrl + 'api/Activities/createActivity', activity, this.getOptions()); // as any;
  }

  getActivitiesForTrip(tripId: number): Observable<DisplayActivityDto[]> {
    return this.http.get<DisplayActivityDto[]>(this.baseUrl + 'api/Activities/getActivitiesForTrip/' + tripId, this.getOptions()); /* .pipe(map(r => {
      return r as any;
    }));*/
  }


  // Méthodes pour Trips --------------------------------------------------------------------
  addTrip(trip: CreateTripDto): Observable<Response> {
    return this.http.post<any>(this.baseUrl + 'api/Trips/createTrip', trip, this.getOptions()); // as any;
  }

  getTripsForUser(): Observable<DisplayTripDto[]> {
    return this.http.get<DisplayTripDto[]>(this.baseUrl + 'api/Trips/getTripsForUser', this.getOptions()); /* .pipe(map(r => {
      return r as any;
    }));*/
  }

  getTripById(tripId: number): Observable<DisplayTripDto> {
    return this.http.get<DisplayTripDto>(this.baseUrl + 'api/Trips/GetTripById/' + tripId, this.getOptions()); /* .pipe(map(r => {
      return r as any;
    }));*/
  }
}
