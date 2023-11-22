import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Career } from 'src/app/models/career';
import { Poll } from 'src/app/models/poll';
import { PollQuestion } from 'src/app/models/poll-question';
import { PollResponseType } from 'src/app/models/poll-response-type';
import { PollType } from 'src/app/models/poll-type';
import { Subject } from 'src/app/models/subject';
import { Toast } from 'src/app/models/toast';
import { CareerService } from 'src/app/services/career.service';
import { PollQuestionService } from 'src/app/services/poll-question.service';
import { PollService } from 'src/app/services/poll.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css']
})
export class PollDetailsComponent implements OnInit {

  poll : Poll;
  pollQuestionList : Array<PollQuestion>;
  isNewPoll: boolean = false;
  toasts: Array<Toast> = new Array<Toast>();

  careerPollType = PollType.CAREER_POLL;
  subjectPollType = PollType.SUBJECT_POLL;

  pollCareerList = Array<Career>();
  pollSubjectList = Array<Subject>();

  pollResponseTypeRatingToFive : PollResponseType = PollResponseType.RATING_TO_FIVE;
  pollResponseTypeYesNoAnswer : PollResponseType = PollResponseType.YES_NO_ANSWER;

  constructor(private route : ActivatedRoute, private pollService : PollService, private pollQuestionService : PollQuestionService, 
              private careerService : CareerService, private subjectService : SubjectService) { }
  
  onSelectPollTypeChange()
  {
    this.poll.subject = this.poll.pollType == this.subjectPollType ? this.pollSubjectList[0] : null;
    this.poll.career = this.poll.pollType == this.careerPollType ? this.pollCareerList[0] : null;

    console.log(this.poll);
    

  }

  onSelectCareerChange()
  {
    console.log(this.poll);
  }

  onSelectSubjectChange()
  {
    console.log(this.poll.subject);
  }


  onSubmitAddPoll()
  {
    if(this.poll.pollType == this.careerPollType) {
      this.pollService.getByCareerId(this.poll.career.id)
        .then(careerResponse=>{
          console.log(careerResponse);
          
        })
        .catch(careerErrorResponse=>{
          console.log("Error");
          console.log(careerErrorResponse);
        });
    } else if (this.poll.pollType == this.subjectPollType) {
      this.pollService.getBySubjectId(this.poll.subject.id)
        .then(careerResponse=>{

        })
        .catch(careerErrorResponse=>{
          console.log("Error");
          console.log(careerErrorResponse);
        });

    }
  }

  addPoll()
  {
    this.pollService.add(this.poll)
      .then(pollResponse => {
        this.poll = pollResponse;
        this.isNewPoll = false;
      })
      .catch(pollErrorResponse => {
        this.showErrorToast("Ha ocurrido un error al agregar la encuesta");
      });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => 
      {
        const pollId = params.id;
        this.isNewPoll = !pollId;


        if(this.isNewPoll) 
        {
          this.poll = new Poll();
          this.poll.pollType = this.subjectPollType;
          this.pollQuestionList = [];
        }else
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
      });

      this.careerService.getAll()
      .then(response=>{
        this.pollCareerList = response;
        this.poll.career = this.isNewPoll && this.poll.pollType == this.careerPollType ? 
                           this.pollCareerList[0] : this.poll.career;
      })
      .catch(error=>{
        console.log(error);
      }); 

      this.subjectService.getAll()
      .then(response=>{
        this.pollSubjectList = response;
        this.poll.subject = this.isNewPoll && this.poll.pollType == this.subjectPollType ? 
                            this.pollSubjectList[0] : this.poll.subject;
      })
      .catch(error=>{
        console.log(error);
      }); 
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
