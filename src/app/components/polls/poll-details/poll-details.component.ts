import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poll } from 'src/app/models/poll';
import { PollQuestion } from 'src/app/models/poll-question';
import { PollResponseType } from 'src/app/models/poll-response-type';
import { Toast } from 'src/app/models/toast';
import { PollQuestionService } from 'src/app/services/poll-question.service';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css']
})
export class PollDetailsComponent implements OnInit {

  poll : Poll;
  pollQuestionList : Array<PollQuestion>;
  inNewPoll: boolean = false;
  toasts: Array<Toast> = new Array<Toast>();
  pollResponseTypeRatingToFive : PollResponseType = PollResponseType.RATING_TO_FIVE;
  pollResponseTypeYesNoAnswer : PollResponseType = PollResponseType.YES_NO_ANSWER;

  constructor(private route : ActivatedRoute, private pollService : PollService, private pollQuestionService : PollQuestionService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => 
      {
        var pollId = params.id;
        if(pollId) 
        {
          this.pollService.getById(pollId)
          .then(pollResponse => {
            this.poll = pollResponse;
            if(this.poll)
            {
              this.pollQuestionService.getAllByPoll(this.poll.id)
              .then(pollQuestionResponse => {
                this.pollQuestionList = pollQuestionResponse;
              })
              .catch(pollQuestionResponseError=>{
                console.log(pollQuestionResponseError);
              });
            }
          })
          .catch(pollResponseError=>{
            console.log(pollResponseError);
          });
        }
      })       
  }

  receiveMessageEventAddPollQuestion($event)
  {
    if($event)
    {                 
      this.pollQuestionList.push($event);                                          
      this.showSuccessToast("La pregunta se ha agregado correctamente");
    } else
    {
      this.showErrorToast("Ha ocurrido un error al agregar la pregunta");
    }
  }

  receiveMessageEventDeletePollQuestion($event)
  {
    if($event)
    {
      this.showSuccessToast("La pregunta se ha eliminado correctamente");
    }else
    {
      this.showErrorToast("Ha ocurrido un error al eliminar la pregunta");
    }
  }

  showSuccessToast(toastBody: string)
  {
    this.toasts.push({class: "success-alert", delay:2000, body: toastBody,iconClass: "fa-solid fa-circle-check"});
  }

  showErrorToast(toastBody: string)
  {
    this.toasts.push({class: "error-alert", delay:2000, body: toastBody,iconClass: "fa-solid fa-circle-xmark"});
  }

  showWarningToast(toastBody: string)
  {
    this.toasts.push({class: "warning-alert", delay:2000, body: toastBody,iconClass: "fa-solid fa-triangle-exclamation"});
  }

  removeToast(toast)
  {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
    
  }

}
