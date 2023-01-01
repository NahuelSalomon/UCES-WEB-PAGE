import { PollQuestion } from "./poll-question";
import { Professor } from "./professor";

export class PollAnswer {

    id: number;
    rating: number;
    shortAnswer: string;
    positiveAnswer: boolean;
    professor: Professor;
    pollQuestion: PollQuestion;


}
