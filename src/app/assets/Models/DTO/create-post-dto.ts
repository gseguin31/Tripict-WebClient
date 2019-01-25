import {Picture} from '../picture';
import {Post} from '../post';

export class CreatePostDTO {
  constructor(public text: string, public pictures: File[], public activityId: number){}
}
