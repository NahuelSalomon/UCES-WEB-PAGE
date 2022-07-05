import { Board } from "./board";
import { Forum } from "./forum"
import { ForumType } from "./forum-type";
import { User } from "./user";

export class Recommendation extends Forum {

    constructor(id: number, body: string, user: User, upVotes: number, downVotes:number, board :Board) {
        super(id, body, user, upVotes, downVotes, board);
        this.forumType = ForumType.RECOMMENDATION;
    }

}
