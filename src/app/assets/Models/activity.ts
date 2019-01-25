import {Trip} from './trip';
import {Post} from './post';

export class Activity {
  constructor(public name: string, public trip: Trip, public posts: Post[]){}
}
