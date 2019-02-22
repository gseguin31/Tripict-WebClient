import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FindUserComponent} from '../find-user/find-user.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WebApiService} from '../Services/web-api.service';
import {MatDialogRef} from '@angular/material';
import {NavbarService} from '../Services/navbar.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {CommentDto} from '../Models/DTO/comment-dto';
import {CreateCommentDto} from '../Models/DTO/create-comment-dto';

@Component({
  selector: 'app-display-post-details',
  templateUrl: './display-post-details.component.html',
  styleUrls: ['./display-post-details.component.css']
})
export class DisplayPostDetailsComponent implements OnInit {

  constructor(public http: WebApiService,
              private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService,
              public navBar: NavbarService,
              public dialogRef: MatDialogRef<DisplayPostDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  comments: CommentDto[];
  addComment: string;
  isSending = false;


  ngOnInit() {
    this.getComments();
  }

  getComments(){
    this.http.getCommentsByPostId(this.data.currentPost.id).subscribe(r => this.comments = r);
  }

  postComment(){
    this.isSending = true;
    let comment = new CreateCommentDto(this.addComment, this.data.currentPost.id);
    this.http.createComment(comment).subscribe(r => {
      this.isSending = false;
      this.addComment = '';
      this.getComments();
    },
      e => {
        if (e.status === 401) {
          this.router.navigateByUrl('/login');
        }
        if (e.status === 400) {
          this.isSending = false;
        }
      });
  }


}
