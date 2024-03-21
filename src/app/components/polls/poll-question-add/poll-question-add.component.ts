import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Poll } from 'src/app/models/poll';
import { PollQuestion } from 'src/app/models/poll-question';
import { PollResponseType } from 'src/app/models/poll-response-type';
import { Toast } from 'src/app/models/toast';
import { PollQuestionService } from 'src/app/services/poll-question.service';


@Component({
  selector: 'app-poll-question-add',
  templateUrl: './poll-question-add.component.html',
  styleUrls: ['./poll-question-add.component.css']
})
export class PollQuestionAddComponent implements OnInit {

  @Input() poll : Poll;
  @Output() messageEventAddPollQuestion = new EventEmitter<PollQuestion>();

  pollResponseTypeRatingToFive : PollResponseType = PollResponseType.RATING_TO_FIVE;
  pollResponseTypeYesNoAnswer : PollResponseType = PollResponseType.YES_NO_ANSWER;

  pollQuestionForm = new FormGroup({
    question: new FormControl('', [ Validators.required, Validators.minLength(20), Validators.maxLength(150)]),
    shortDescription: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    pollResponseType: new FormControl(this.pollResponseTypeRatingToFive ,[Validators.required])
  })

  get question() { return this.pollQuestionForm.get('question'); }
  get shortDescription() { return this.pollQuestionForm.get('shortDescription'); }
  get pollResponseType() { return this.pollQuestionForm.get('pollResponseType'); }

  constructor(private pollQuestionService: PollQuestionService, private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSubmitAddQuestion()
  {
    var question : string = this.question.value;
    var shortDescription : string = this.shortDescription.value;
    var pollResponseType : PollResponseType = this.pollResponseType.value;

    var pollQuestion = new PollQuestion(null,this.poll,question,shortDescription,pollResponseType);

    if(this.poll.id != null)
    {
      this.pollQuestionService.add(pollQuestion, this.authService.token)
      .then(pollQuestionResponse =>{
        this.messageEventAddPollQuestion.emit(pollQuestionResponse);
      })
      .catch(pollQuestionError=>{
        this.messageEventAddPollQuestion.emit(null);
      });
    }
    else
    {      
      this.messageEventAddPollQuestion.emit(pollQuestion);
    }



  }

}
