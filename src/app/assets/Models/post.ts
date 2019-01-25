import {Picture} from './picture';

export class Post {
  constructor(public userId: number, public text: string, public pictureList: Picture[]){}
}
