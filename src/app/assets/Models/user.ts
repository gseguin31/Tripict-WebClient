import {Post} from './post';
import {Trip} from './trip';

export class User {
  constructor(public userId: number, public firstName: string, public lastName: string, public email: string, public password: string, public posts: Post[], public trips: Trip[]){}
}
