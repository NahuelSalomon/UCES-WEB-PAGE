import { PollQuestion } from "./poll-question";
import { Professor } from "./professor";

export class PollAnswer {

    id: number;
    rating: number;
    positiveAnswer: boolean;
    professor: Professor;
    pollQuestion: PollQuestion;


    constructor(id: number,rating: number, positiveAnswer: boolean, professor: Professor, pollQuestion: PollQuestion)
    {
        this.id = id;
        this.rating = rating;
        this.positiveAnswer = positiveAnswer;
        this.professor = professor;
        this.pollQuestion = pollQuestion;
    }


}
