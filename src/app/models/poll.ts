import { Career } from "./career"
import { PollQuestion } from "./poll-question"
import { Subject } from "./subject"

export class Poll {

    id: number
    title: string
    description: string
    career: Career
    subject: Subject
    questions: Array<PollQuestion>

    constructor(id: number, title: string, description: string, career: Career, subject: Subject, questions: Array<PollQuestion>){
        this.id = id
        this.title = title
        this.description = description
        this.career = career
        this.subject = subject
        this.questions = questions 
    }
}
