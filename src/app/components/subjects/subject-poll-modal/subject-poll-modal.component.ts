import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Career } from 'src/app/models/career';
import { Poll } from 'src/app/models/poll';
import { PollAnswer } from 'src/app/models/poll-answer';
import { PollResponseType } from 'src/app/models/poll-response-type';
import { Professor } from 'src/app/models/professor';
import { Subject } from 'src/app/models/subject';
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
  
  pollQuestionFormGroup : FormGroup;

  getFromControl(name: string) { return this.pollQuestionFormGroup.get(name);}

  constructor(private route :ActivatedRoute, private pollService: PollService, private professorService: ProfessorService) { }

  ngOnInit(): void {

    this.pollQuestionFormGroup = new FormGroup({});
    this.answersList = new Array<PollAnswer>();

    this.pollService.getBySubjectId(this.subject.id)
      .then(pollResponse=>{

        this.poll = pollResponse;
        
        this.poll.questions.forEach(question=>
        {


          var initialValueFromControl = question.pollResponseType == PollResponseType.RATING_TO_FIVE || question.pollResponseType == PollResponseType.YES_NO_DESCRIPTION_IN_NO_ANSWER  
                                        ?  "1" : '';
          var formControl : FormControl = new FormControl( initialValueFromControl, [ Validators.required ]);
 
          this.pollQuestionFormGroup.addControl(question.pollResponseType + question.id, formControl); 
          

        })


        console.log(this.pollQuestionFormGroup);
        

      })
      .catch(pollError=>{

        
      });

      this.professorService.getAll()
      
      .then(professorResponse =>{
        this.professorList = professorResponse;
        
      })
      .catch(professorError =>{});
    }


    isNoAnswer() : boolean
    {
      return true;

    }

    sendPollResponses()
    {
      for(var question of this.poll.questions)
      {
        var responseValue = this.getFromControl(question.pollResponseType+question.id).value;

        var rating = question.pollResponseType == PollResponseType.RATING_TO_FIVE || question.pollResponseType == PollResponseType.PROFESSOR_RATING ?
                     responseValue : null;

        var shortAnswer = question.pollResponseType == PollResponseType.SHORT_ANSWER || question.pollResponseType == PollResponseType.SHORT_NUMBER_ANSWER ?
                          responseValue : null;


        var pollResponse = new PollAnswer(Number(rating),shortAnswer,null,null, question);
        
        
        this.answersList.push(pollResponse);

      }  
      
      console.log(this.answersList);
      
    }
    

}
