import {Picture} from '../picture';
import {PictureDto} from './picture-dto';

export class PostDto {
  constructor(public id: number, public text: string, public idTable: number[], public date: string, public userName: string) {
  }
}
