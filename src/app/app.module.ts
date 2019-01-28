import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
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
import { ActivityComponent } from './activity/activity.component';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    ActivityComponent
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
    RouterModule.forRoot([
      {path: '', component: AppComponent},
      {path: ':trip/activity', component: ActivityComponent},
      {path: ':trip/:activity/post', component: PostComponent}
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
