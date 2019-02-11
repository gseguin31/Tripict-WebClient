import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreatePostComponent } from './createPost/createPost.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WebApiService } from './Services/web-api.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatList} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { DisplayPostComponent } from './display-post/display-post.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CreditsComponent } from './credits/credits.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { DisplayActivitiesComponent } from './display-activities/display-activities.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplayTripComponent } from './display-trip/display-trip.component';
import { CreateTripComponent } from './create-trip/create-trip.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    CreateActivityComponent,
    DisplayPostComponent,
    CreditsComponent,
    LoginComponent,
    DisplayActivitiesComponent,
    NavbarComponent,
    DisplayTripComponent,
    CreateTripComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    NgbModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},

      {path: 'trips', component: DisplayTripComponent},
      {path: 'trips/create-trip', component: CreateTripComponent},
      {path: ':trip/create-activity', component: CreateActivityComponent},
      {path: ':trip/:activity', component: DisplayActivitiesComponent},
      {path: ':trip/:create-activity/createPost', component: CreatePostComponent},
      {path: ':trip/:activity/posts', component: DisplayPostComponent},
      {path: ':trip/:activity/createPost', component: CreatePostComponent}
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
