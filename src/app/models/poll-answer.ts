import { PollQuestion } from "./poll-question";
import { PollResult } from "./poll-result";

export class PollAnswer {

    id: number;
    pollQuestion: PollQuestion;
    pollResult: PollResult;
    boolResponse: boolean;
    rankResponse: number;
  
    constructor(id: number, pollQuestion: PollQuestion, pollResult: PollResult, boolResponse: boolean, rankResponse: number)
    {
        this.id = id;
        this.pollQuestion = pollQuestion;
        this.pollResult = pollResult;
        this.boolResponse = boolResponse;
        this.rankResponse = rankResponse;
    }

}
