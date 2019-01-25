import {User} from './user';
import {Activity} from './activity';

export class Trip {
  constructor(public tripId: number, public name: string, public users: User[], public activities: Activity[]){}
}
