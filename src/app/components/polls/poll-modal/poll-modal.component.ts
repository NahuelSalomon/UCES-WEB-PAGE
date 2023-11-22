import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Career } from 'src/app/models/career';
import { Poll } from 'src/app/models/poll';
import { PollAnswer } from 'src/app/models/poll-answer';
import { PollQuestion } from 'src/app/models/poll-question';
import { PollResponseType } from 'src/app/models/poll-response-type';
import { PollResult } from 'src/app/models/poll-result';
import { Subject } from 'src/app/models/subject';
import { PollAnswerService } from 'src/app/services/poll-answer.service';
import { PollQuestionService } from 'src/app/services/poll-question.service';
import { PollResultService } from 'src/app/services/poll-result.service';
import { PollService } from 'src/app/services/poll.service';


@Component({
  selector: 'app-poll-modal',
  templateUrl: './poll-modal.component.html',
  styleUrls: ['./poll-modal.component.css']
})
export class PollModalComponent implements OnInit {

  @Input() poll: Poll;
  @Input() modal;
  @Output() pollSuccessfulResultEventEmitter = new EventEmitter<boolean>();

  pollResponseType = PollResponseType;
  answersList : Array<PollAnswer>;
  pollQuestions : Array<PollQuestion>;
  pollQuestionFormGroup : FormGroup;
  completedPollFormControls : boolean = false;


  getFromControl(name: string) { return this.pollQuestionFormGroup.get(name);}

  constructor(private route :ActivatedRoute, private pollService: PollService, private pollAnswerService: PollAnswerService, 
              private authService: AuthService, private pollQuestionService: PollQuestionService, private pollResultService: PollResultService) { }

  ngOnInit(): void {

    this.pollQuestionFormGroup = new FormGroup({});
    this.answersList = new Array<PollAnswer>();
    this.pollQuestionService.getAllByPoll(this.poll.id)
      .then(response=>
        {
          this.pollQuestions = response;

          this.pollQuestions.forEach(question=>
            {
              var formControlFirstResponse : FormControl = new FormControl( "1", [ Validators.required ]);
              this.pollQuestionFormGroup.addControl(question.pollResponseType + question.id, formControlFirstResponse); 
            
            })

        })
      .catch(error => {
          console.log(error);
          
        });

       
        this.completedPollFormControls = true;
   
    }


    isNoAnswer(formControlName: string) : boolean
    {
      return this.getFromControl(formControlName).value == "1";
    }

    sendPollResponses()
    {
      this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(userResponse=>{

        var pollResult : PollResult = new PollResult(0,this.poll,userResponse);

        this.pollResultService.add(pollResult)
          .then(pollResultResponse=>
            {
              var pollResultCreated : PollResult = pollResultResponse;
              for(var pollQuestion of this.pollQuestions)
              {
                var responseValue = this.getFromControl(pollQuestion.pollResponseType+pollQuestion.id).value;
                var rankResponse = pollQuestion.pollResponseType == PollResponseType.RATING_TO_FIVE ? responseValue : null;
                var boolResponse = pollQuestion.pollResponseType == PollResponseType.YES_NO_ANSWER ? responseValue == 1 : null;
                var pollResponse = new PollAnswer(null,pollQuestion,pollResultCreated, boolResponse,rankResponse);
                this.answersList.push(pollResponse);
              }  

              console.log(this.answersList);
              
              this.pollAnswerService.addAll(this.answersList)
                .then(pollAnswerResponse=>
                  {
               
                    this.modal.dismiss();
                    this.pollSuccessfulResultEventEmitter.emit(true);
                  }
                )
                .catch(pollAnswerError => {
                  console.log(pollAnswerError);
                  this.modal.dismiss();
                  this.pollSuccessfulResultEventEmitter.emit(false);
                });

            })
          .catch(pollResultError=>{
            console.log(pollResultError);
            this.modal.dismiss();
            this.pollSuccessfulResultEventEmitter.emit(false);
          });
      })
      .catch(errorResponse => {
        console.log(errorResponse);
        this.modal.dismiss();
        this.pollSuccessfulResultEventEmitter.emit(false);
      });
    }
 
    yesNoRadioButtonSelected(value)
    {


    }

}
