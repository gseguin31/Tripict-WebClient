
export class CreatePostDTO {
  constructor(public text: string, public pictures: File[], public activityId: number){}
}
