import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Poll } from 'src/app/models/poll';
import { PollQuestionStatistic } from 'src/app/models/poll-question-statistic';
import { PollResponseType } from 'src/app/models/poll-response-type';
import { PollQuestionStatisticService } from 'src/app/services/poll-question-statistic.service';
import { Toast } from 'src/app/models/toast';
import { AuthService } from 'src/app/auth/auth.service';
import { PollResultService } from 'src/app/services/poll-result.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserType } from 'src/app/models/user-type';

@Component({
  selector: 'app-poll-question-statistics',
  templateUrl: './poll-question-statistics.component.html',
  styleUrls: ['./poll-question-statistics.component.css']
})
export class PollQuestionStatisticsComponent implements OnInit {

  @Input() poll : Poll;
  @Input() isLinearLayout: boolean = false;
  yesNoAnswerpollResponseType : PollResponseType = PollResponseType.YES_NO_ANSWER;
  ratingToFiveAnswerpollResponseType : PollResponseType = PollResponseType.RATING_TO_FIVE;
  pollQuestionStatisticList : Array<PollQuestionStatistic>;
  toasts: Array<Toast> = new Array<Toast>();
  userType = "ANONYMOUS";
  userTypeStudent = "ROLE_STUDENT";

  constructor(private pollQuestionStatisticService : PollQuestionStatisticService, private authService: AuthService, 
              private pollResultService: PollResultService, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.userType = sessionStorage.getItem('userType');
    if(this.poll != null)
    {
      this.setPollQuestionStatistics();
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    // This will be called whenever there is a change in the input properties.
    if (changes.poll && !changes.poll.firstChange) {
      // The poll input has changed. You can perform actions here.
      this.setPollQuestionStatistics();
    }
  
  }


  setPollQuestionStatistics()
  {
    if(this.poll != null)
    {
      this.pollQuestionStatisticService.getAllByPollId(this.poll.id)
      .then(responsePollQuestionStatistic=>{
        this.pollQuestionStatisticList = responsePollQuestionStatistic;    
      })
      .catch(errorPollQuestionStatistic=>{
        console.log(errorPollQuestionStatistic);
      })
    }
  }

  pollSuccessfulResultEvent(result) {
    if (result) {
      this.showSuccessToast("La ecuesta se ha enviado de manera exitosa");
      this.setPollQuestionStatistics();
    }
    else {
      this.showErrorToast("Ha ocurrido un error al enviar la encuesta");
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

  openModal(content) {

        this.authService.getUserDetails(sessionStorage.getItem('token'))
          .then(userResponse => {

            this.pollResultService.getByPollAndUser(this.poll.id,userResponse.id)
            .then(responsePollUser => {

              if(responsePollUser == null)
              {
                this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  
                }, (reason) => { /*Modal no exitoso*/ });
              }
              else
              {
                this.showWarningToast("Ya has respondido esta encuesta");
              }

            })
            .catch(errorPollUser => {
                console.log(errorPollUser);                
                this.showErrorToast("Ha ocurrido un error al mostrar la encuesta");
            })
          })
          .catch(errorUserResponse => {
            console.log(errorUserResponse);
            this.showErrorToast("Ha ocurrido un error al mostrar la encuesta");
          })
  }

  removeToast(toast)
  {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }    
  }

}
