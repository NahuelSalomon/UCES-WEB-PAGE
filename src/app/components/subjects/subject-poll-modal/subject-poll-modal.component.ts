import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Career } from 'src/app/models/career';
import { Poll } from 'src/app/models/poll';
import { PollResponseType } from 'src/app/models/poll-response-type';
import { Subject } from 'src/app/models/subject';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-subject-poll-modal',
  templateUrl: './subject-poll-modal.component.html',
  styleUrls: ['./subject-poll-modal.component.css']
})
export class SubjectPollModalComponent implements OnInit {

  @Input() subject: Subject;
  poll: Poll;
  pollResponseType = PollResponseType;

  constructor(private route :ActivatedRoute, private pollService: PollService) { }

  ngOnInit(): void {
    this.pollService.getBySubjectId(this.subject.id)
      .then(pollResponse=>{

        this.poll = pollResponse;
        console.log(this.poll);
      })
      .catch(pollError=>{

      });
       
  }

}
