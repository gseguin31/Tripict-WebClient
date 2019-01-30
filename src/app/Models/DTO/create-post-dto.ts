import {CreatePictureDto} from './create-picture-dto';

export class CreatePostDTO {
  constructor(public Text: string, public CreatePicturesDTO: CreatePictureDto[], public activityId: number){}
}
