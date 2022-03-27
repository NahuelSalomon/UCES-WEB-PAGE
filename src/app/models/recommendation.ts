import { Forum } from "./forum"
import { TypeForum } from "./type-forum";
import { User } from "./user";

export class Recommendation extends Forum {

    constructor(id: number, body: string, user: User, upVotes: number, downVotes:number) {
        super(id, body, user, upVotes, downVotes);
        this.forumType = TypeForum.RECOMMENDATION;
    }

}
