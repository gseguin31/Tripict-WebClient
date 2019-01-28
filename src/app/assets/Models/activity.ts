import {Trip} from './trip';
import {Post} from './post';
import {CreatePostDTO} from './DTO/create-post-dto';
<<<<<<< HEAD
import {CreateActivityDto} from './DTO/create-activity-dto';
=======
import {CreateActivityDTO} from './DTO/create-activity-dto';
>>>>>>> cb5b1f213ba31a8857c422d0337a4f42809717a1

export class Activity {
  constructor(public name: string, public trip: Trip, public posts: Post[]){}

<<<<<<< HEAD
  public toCreateActivityDTO(activity: Activity): CreateActivityDto{
    let res = new CreateActivityDto(activity.name, activity.trip.tripId)
=======
  public toCreateActivityDTO(activity: Activity): CreateActivityDTO{
    let res = new CreateActivityDTO(activity.name, activity.trip.tripId)
>>>>>>> cb5b1f213ba31a8857c422d0337a4f42809717a1
    return res;
  }
}
