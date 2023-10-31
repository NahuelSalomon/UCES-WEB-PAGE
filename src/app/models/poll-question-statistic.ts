import { Poll } from "./poll";
import { PollQuestion } from "./poll-question";
import { PollResponseType } from "./poll-response-type";

export class PollQuestionStatistic {

    id: number;
    pollQuestion: PollQuestion;
    numberOfPositiveResponse: number;
    numberOfNegativeResponse: number;
    totalRangeResponse : number;
    numberOfResponses: number;
    
    constructor(id: number, pollQuestion: PollQuestion, numberOfPositiveResponse: number, numberOfNegativeResponse: number,totalRangeResponse : number, numberOfResponses: number)
    {
        this.id = id;
        this.pollQuestion = pollQuestion;
        this.numberOfPositiveResponse = numberOfPositiveResponse;
        this.numberOfNegativeResponse = numberOfNegativeResponse;
        this.totalRangeResponse = totalRangeResponse;
        this.numberOfResponses = numberOfResponses;
    }

}
