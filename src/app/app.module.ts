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
import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule} from '@angular/material';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { DisplayPostComponent } from './display-post/display-post.component';
import {MatCardModule} from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    CreateActivityComponent,
    DisplayPostComponent
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
    RouterModule.forRoot([
      {path: '', component: AppComponent},

      {path: ':trip/create-activity', component: CreateActivityComponent},
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
