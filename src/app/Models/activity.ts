import {Trip} from './trip';
import {Post} from './post';
import {CreatePostDto} from './DTO/create-post-dto';
import {CreateActivityDto} from './DTO/create-activity-dto';

export class Activity {
  constructor(public name: string, public tripId: number, public posts: Post[]){}

  public toCreateActivityDTO(activity: Activity): CreateActivityDto{
    let res = new CreateActivityDto(activity.name, activity.tripId)
    return res;
  }
}
