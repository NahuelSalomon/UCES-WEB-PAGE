import { Board } from "./board";
import { QueryResponse } from "./query-response";
import { ForumType } from "./forum-type";
import { User } from "./user";

export class Forum {
    id: number;
    body: string;
    date: Date;
    user: User;
    usersWhoVoted : Array<User>;
    board: Board;
    forumType: ForumType;
    responses: Array<QueryResponse>;nb  

    constructor(id: number, body: string,date: Date, user: User, board: Board) {
        this.id  = id;
        this.body = body;
        this.date = date;
        this.user = user;
        this.board = board;
        this.usersWhoVoted = new Array<User>();
        this.responses = new Array<QueryResponse>();
    }

}
