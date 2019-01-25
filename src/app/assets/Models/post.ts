import {Picture} from './picture';
import {CreatePostDTO} from './DTO/create-post-dto';

export class Post {
  constructor(public text: string, public pictureList: Picture[], public activityId: number){}

  public toCreatePostDTO(post: Post): CreatePostDTO{
    let res = new CreatePostDTO(post.text, post.pictureList, post.activityId)
    return res;
  }
}
