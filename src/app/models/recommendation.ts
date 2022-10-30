import { Board } from "./board";
import { Forum } from "./forum"
import { ForumType } from "./forum-type";
import { User } from "./user";

export class Recommendation extends Forum {

    constructor(id: number, body: string,date: Date, user: User, board :Board) {
        super(id, body,date,user, board);
        this.forumType = ForumType.RECOMMENDATION;
        super.responses = null;
    }

}
