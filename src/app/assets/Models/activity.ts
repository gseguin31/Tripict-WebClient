import {Trip} from './trip';
import {Post} from './post';
import {CreatePostDTO} from './DTO/create-post-dto';

export class Activity {
  constructor(public activityId: number, public name: string, public trip: Trip, public posts: Post[]){}

  public toCreateActivityDTO(activity: Activity): CreatePostDTO{
    let res = new CreateActivityDTO(activity.name, activity.trip.tripId)
    return res;
  }
}
