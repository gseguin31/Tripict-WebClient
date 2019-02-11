import {CreatePictureDto} from './create-picture-dto';

export class CreatePostDto {
  constructor(public text: string, public picCount: number, public activityId: number) {
  }
}
