import {Picture} from '../picture';
import {PictureDto} from './picture-dto';

export class PostDto {
  constructor(public id: number, public text: string, public picturesDTO: PictureDto[], public userId: number, public date: string) {
  }
}
