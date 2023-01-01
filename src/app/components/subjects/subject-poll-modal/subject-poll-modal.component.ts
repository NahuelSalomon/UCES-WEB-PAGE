import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private route :ActivatedRoute, private pollService: PollService, private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.pollService.getBySubjectId(this.subject.id)
      .then(pollResponse=>{

        this.poll = pollResponse;
        
        this.poll.questions.forEach(q=>
        {
          var pollAnswer : PollAnswer  = new PollAnswer();
          pollAnswer.pollQuestion = q;
          this.answersList.push(pollAnswer);
        })

        
        
      })
      .catch(pollError=>{

      });

      this.professorService.getAll()
      
      .then(professorResponse =>{
        this.professorList = professorResponse;
        
      })
      .catch(professorError =>{});
    }

    isFildAvailableByQuestion(id: number) : boolean
    {
      console.log(id);
      
      return true;

    }

    isNoAnswer() : boolean
    {
      return true;

    }
    

}
