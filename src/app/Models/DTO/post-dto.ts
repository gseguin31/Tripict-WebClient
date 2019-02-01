import {Picture} from '../picture';
import {PictureDTO} from './picture-dto';

export class PostDTO {
  constructor(public Id: number, public Text: string, public PicturesDTO: PictureDTO[], public UserId: number, public Date: string) {}
}
