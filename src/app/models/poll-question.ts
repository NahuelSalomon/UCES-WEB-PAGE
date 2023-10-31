import { Poll } from "./poll";
import { PollResponseType } from "./poll-response-type"

export class PollQuestion {

    id: number;
    poll: Poll;
    question: string;
    shortDescription: string;
    pollResponseType: PollResponseType;

    constructor(id: number, poll: Poll, question: string, shortDescription: string, pollResponseType: PollResponseType)
    {
        this.id = id;
        this.poll = poll;
        this.question = question;
        this.shortDescription = shortDescription;
        this.pollResponseType = pollResponseType;
    }

}
