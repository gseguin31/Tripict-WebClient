import {Picture} from './picture';
import {CreatePostDTO} from './DTO/create-post-dto';

export class Post {
  constructor(public text: string, public pictureList: File[], public activityId: number){}

  /*public toCreatePostDTO(post: Post): CreatePostDTO{
    let res = new CreatePostDTO(post.text, post.pictureList.toString(), post.activityId)
    return res;
  }*/
}
