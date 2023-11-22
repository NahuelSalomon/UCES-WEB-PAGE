import { Career } from "./career"
import { PollQuestion } from "./poll-question"
import { PollType } from "./poll-type";
import { Subject } from "./subject"

export class Poll {

    id: number;
    pollType: PollType;
    career: Career;
    subject: Subject;

    constructor(career: Career = null, subject: Subject = null){
        this.id = null;
        this.career = career;
        this.subject = subject; 
    }
}
