import { Poll } from "./poll";
import { User } from "./user";

export class PollResult {

    id: number;
    poll: Poll;
    studentUser: User;

    constructor(id: number, poll: Poll, studentUser: User)
    {
        this.id = id;
        this.poll = poll;
        this.studentUser = studentUser;
    }

}
