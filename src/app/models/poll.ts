import { Career } from "./career"
import { PollQuestion } from "./poll-question"
import { PollType } from "./poll-type";
import { Subject } from "./subject"

export class Poll {

    id: number;
    pollType: PollType;
    career: Career;
    subject: Subject;

    constructor(id: number, title: string, description: string, career: Career, subject: Subject){
        this.id = id;
        this.career = career;
        this.subject = subject; 
    }
}
