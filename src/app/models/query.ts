import { Forum } from "./forum";
import { ResponseQuery } from "./response-query";
import { User } from "./user";

export class Query extends Forum{

    response: Array<ResponseQuery>;

    constructor(id: number, body: string, user: User, upVotes: number, downVotes:number) {
        super(id, body, user, upVotes, downVotes);
        this.response = new Array<ResponseQuery>();
    }

}
