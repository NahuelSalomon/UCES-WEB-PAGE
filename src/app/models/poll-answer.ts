import { PollQuestion } from "./poll-question";
import { Professor } from "./professor";

export class PollAnswer {

    id: number;
    rating: number;
    shortAnswer: string;
    positiveAnswer: boolean;
    professor: Professor;
    pollQuestion: PollQuestion;


    constructor(rating: number, shortAnswer: string, positiveAnswer: boolean, professor: Professor, pollQuestion: PollQuestion)
    {
        this.rating = rating;
        this.shortAnswer = shortAnswer;
        this.positiveAnswer = positiveAnswer;
        this.professor = professor;
        this.pollQuestion = pollQuestion;
    }


}
