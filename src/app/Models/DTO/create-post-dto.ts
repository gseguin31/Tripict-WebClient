import {CreatePictureDto} from './create-picture-dto';

export class CreatePostDTO {
  constructor(public Text: string, public picCount: number, public activityId: number){}
}
