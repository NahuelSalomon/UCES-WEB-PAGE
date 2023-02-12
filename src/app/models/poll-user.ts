import { Poll } from "./poll";
import { User } from "./user";

export class PollUser {

    id: Number;
    poll: Poll;
    user: User;

    constructor(id: Number, poll:Poll, user: User)
    {
        this.id = id;
        this.poll = poll;
        this.user = user;
    }

}
