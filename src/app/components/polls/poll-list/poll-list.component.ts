import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/models/poll';
import { PollType } from 'src/app/models/poll-type';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  pollList : Array<Poll>;
  subjectPollType = PollType.SUBJECT_POLL;
  careerPollType = PollType.CAREER_POLL;

  constructor(private pollService : PollService) { }


  ngOnInit(): void {
    this.pollService.getAll()
    .then(response=>{
      this.pollList = response;
    })
    .catch(error=>{
      console.log(error);
    });
  }

}
