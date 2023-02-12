import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Career } from 'src/app/models/career';
import { Poll } from 'src/app/models/poll';
import { PollAnswer } from 'src/app/models/poll-answer';
import { PollResponseType } from 'src/app/models/poll-response-type';
import { PollUser } from 'src/app/models/poll-user';
import { Professor } from 'src/app/models/professor';
import { Subject } from 'src/app/models/subject';
import { PollAnswerService } from 'src/app/services/poll-answer.service';
import { PollUserService } from 'src/app/services/poll-user.service';
import { PollService } from 'src/app/services/poll.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-subject-poll-modal',
  templateUrl: './subject-poll-modal.component.html',
  styleUrls: ['./subject-poll-modal.component.css']
})
export class SubjectPollModalComponent implements OnInit {

  @Input() subject: Subject;
  poll: Poll;
  pollResponseType = PollResponseType;
  professorList : Array<Professor>;
  answersList : Array<PollAnswer>;
  showToastSuccess : boolean = false;
  showToastError : boolean = false;
  @Input() modal;
  @Output() pollSuccessfulResultEventEmitter = new EventEmitter<boolean>();
  
  
  pollQuestionFormGroup : FormGroup;

  pollResponseTypesWithTwoResponses : Array<PollResponseType> = new Array<PollResponseType>(PollResponseType.PROFESSOR_RATING);

  getFromControl(name: string) { return this.pollQuestionFormGroup.get(name);}

  constructor(private route :ActivatedRoute, private pollService: PollService, private professorService: ProfessorService, private pollAnswerService: PollAnswerService, private pollUserService: PollUserService, private authService: AuthService) { }

  ngOnInit(): void {

    this.pollQuestionFormGroup = new FormGroup({});
    this.answersList = new Array<PollAnswer>();

    this.professorService.getAll()
      .then(professorResponse =>{
          this.professorList = professorResponse;

          this.pollService.getBySubjectId(this.subject.id)
          .then(pollResponse=>{
    
            this.poll = pollResponse;
            
            this.poll.questions.forEach(question=>
            {
    
    
              var initialValueFromControlFirstResponse = question.pollResponseType == PollResponseType.RATING_TO_FIVE || question.pollResponseType == PollResponseType.YES_NO_DESCRIPTION_IN_NO_ANSWER || question.pollResponseType == PollResponseType.PROFESSOR_RATING 
                                            ?  "1" : '';
              var formControlFirstResponse : FormControl = new FormControl( initialValueFromControlFirstResponse, [ Validators.required ]);
     
              if(this.pollResponseTypesWithTwoResponses.find(p => p == question.pollResponseType) != null)
              {
                var initialValueFromControlSecondResponse = question.pollResponseType == PollResponseType.PROFESSOR_RATING  
                ?  this.professorList[0].id : '';
    
                var formControlSecondResponse : FormControl = new FormControl( initialValueFromControlSecondResponse, [ Validators.required ]);  
    
                this.pollQuestionFormGroup.addControl(`${question.pollResponseType}${question.id}second`, formControlSecondResponse); 
    
              } 
    
              this.pollQuestionFormGroup.addControl(question.pollResponseType + question.id, formControlFirstResponse); 
              
            })
          })
          .catch(pollError=>{
          });
      })
      .catch(professorError =>{});
    }


    isNoAnswer(formControlName: string) : boolean
    {
      return this.getFromControl(formControlName).value == "1";
    }

    sendPollResponses()
    {
      for(var question of this.poll.questions)
      {
        var responseValue = this.getFromControl(question.pollResponseType+question.id).value;

        var secondResponseValue = (this.pollResponseTypesWithTwoResponses.find(p => p == question.pollResponseType) != null) ? 
                                   this.getFromControl(question.pollResponseType+question.id+'second').value : null;

        var rating = question.pollResponseType == PollResponseType.RATING_TO_FIVE || question.pollResponseType == PollResponseType.PROFESSOR_RATING ?
                     responseValue : null;

        var shortAnswer = question.pollResponseType == PollResponseType.SHORT_ANSWER || question.pollResponseType == PollResponseType.SHORT_NUMBER_ANSWER ?
                          responseValue : (question.pollResponseType == PollResponseType.YES_NO_DESCRIPTION_IN_NO_ANSWER && responseValue == "0" ? secondResponseValue : null);

        var positiveAnswer = question.pollResponseType == PollResponseType.YES_NO_DESCRIPTION_IN_NO_ANSWER ? responseValue == 1 : null;
              
        var professor = question.pollResponseType == PollResponseType.PROFESSOR_RATING ? this.professorList.find(p=> p.id == Number(secondResponseValue)) : null;

        var pollResponse = new PollAnswer(0,Number(rating),shortAnswer,positiveAnswer,professor, question);
        
        
        this.answersList.push(pollResponse);
      }  
    
      this.pollAnswerService.addAll(this.answersList)
       .then(responseAddAll=>
        {

          this.authService.getUserDetails(sessionStorage.getItem('token'))
          .then(userResponse=>{
            
          
            var pollUser = new PollUser(0,this.poll,userResponse);
            this.pollUserService.add(pollUser)
            .then(responseAddPoll=>{
              this.modal.dismiss();
              this.pollSuccessfulResultEventEmitter.emit(true);
            })
            .catch(errorAddPoll=>{
              this.modal.dismiss();
              this.pollSuccessfulResultEventEmitter.emit(false);
            });

          })
          .catch(error=>{
            this.modal.dismiss();
            this.pollSuccessfulResultEventEmitter.emit(false);
          });
        })
        .catch(errorAddAll=>{
          this.modal.dismiss();
          this.pollSuccessfulResultEventEmitter.emit(false);
        });
      
    }

    yesNoRadioButtonSelected(value)
    {


    }

}
