import { Board } from "./board";
import { QueryResponse } from "./query-response";
import { ForumType } from "./forum-type";
import { User } from "./user";

export class Forum {
    id: number;
    body: string;
    user: User;
    upVotes: number;
    downVotes: number;
    board: Board;
    forumType: ForumType;
    responses: Array<QueryResponse>;

    constructor(id: number, body: string, user: User, upVotes: number, downVotes:number, board: Board) {
        this.id  = id;
        this.body = body;
        this.user = user;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.board = board;
        this.responses = new Array<QueryResponse>();
    }

}
