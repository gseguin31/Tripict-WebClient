import {Picture} from '../picture';
import {PictureDTO} from './picture-dto';

export class PostDTO {
  constructor(public id: number, public text: string, public picturesDTO: PictureDTO[], public userId: number, public date: string) {
  }
}
