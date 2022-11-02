import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Career } from 'src/app/models/career';
import { Poll } from 'src/app/models/poll';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-career-poll',
  templateUrl: './career-poll.component.html',
  styleUrls: ['./career-poll.component.css']
})
export class CareerPollComponent implements OnInit {

  career: Career;
  poll: Poll;

  constructor(private route :ActivatedRoute, private pollService: PollService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.pollService.getByCareerId(params.id)
        .then(response => {
         this.career = response
         this.pollService.getByCareerId(this.career.id)
          .then(response => {
            this.poll = response
            console.log(response)
          })
        }) 
       .catch(err => console.log(err))
    })
  
  }
  

}
