import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poll } from 'src/app/models/poll';
import { PollQuestion } from 'src/app/models/poll-question';
import { PollResponseType } from 'src/app/models/poll-response-type';
import { PollQuestionService } from 'src/app/services/poll-question.service';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-question-list',
  templateUrl: './poll-question-list.component.html',
  styleUrls: ['./poll-question-list.component.css']
})
export class PollQuestionListComponent implements OnInit {

  @Input() poll : Poll;
  @Input() pollQuestionList : Array<PollQuestion>;
  pollResponseTypeRatingToFive : PollResponseType = PollResponseType.RATING_TO_FIVE;
  pollResponseTypeYesNoAnswer : PollResponseType = PollResponseType.YES_NO_ANSWER;
  @Output() messageEventDeletePollQuestion = new EventEmitter<PollQuestion>();
  @Output() messageEventText = new EventEmitter<string>();

  constructor(private pollQuestionService : PollQuestionService) { }

  ngOnInit(): void {
   
  }

  deletePollQuestion(pollQuestion : PollQuestion)
  {
  
    if(this.poll.id != null)
    {
      if(this.pollQuestionList.length > 1)
      {
        this.pollQuestionService.delete(pollQuestion.id)
        .then(pollQuestionDeleteResponse => {    
          const index = this.pollQuestionList.indexOf(pollQuestion);
          this.pollQuestionList.splice(index,1);
          this.messageEventDeletePollQuestion.emit(pollQuestion);
        })
        .catch(pollQuestionDeleteResponseError => {
          this.messageEventDeletePollQuestion.emit(null);
        });
      }
      else
      {
        this.messageEventText.emit("No se pueden eliminar todas las preguntas de una encuesta");
      }
     
    }
    else
    {
      const index = this.pollQuestionList.indexOf(pollQuestion);
      this.pollQuestionList.splice(index,1);
      this.messageEventDeletePollQuestion.emit(pollQuestion);
    }

  }

}
