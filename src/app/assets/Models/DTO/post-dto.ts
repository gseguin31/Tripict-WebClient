import {Picture} from '../picture';

export class PostDTO {
  constructor(public Id: number, public Text: string, public Pictures: Picture[]) {}
}
