import { ResponseQuery } from "./response-query";
import { User } from "./user";

export class Forum {
    id: number;
    body: string;
    user: User;
    upVotes: number;
    downVotes: number;
    responses: Array<ResponseQuery>;

    constructor(id: number, body: string, user: User, upVotes: number, downVotes:number) {
        this.id  = id;
        this.body = body;
        this.user = user;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
    }

}
