import {Picture} from './picture';
import {CreatePostDto} from './DTO/create-post-dto';

export class Post {
  constructor(public text: string, public pictureList: String[], public activityId: number){}

  /*public toCreatePostDTO(post: Post): CreatePostDto{
    let res = new CreatePostDto(post.text, post.pictureList.toString(), post.activityId)
    return res;
  }*/
}
