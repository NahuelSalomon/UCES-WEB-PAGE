import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Poll } from 'src/app/models/poll';
import { PollType } from 'src/app/models/poll-type';
import { Toast } from 'src/app/models/toast';
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
  pollSelectedToDelete : Poll;

  toasts: Array<Toast> = new Array<Toast>();
  

  constructor(private pollService : PollService, private router : Router, private modalService : NgbModal) { }


  ngOnInit(): void {
    this.pollService.getAll()
    .then(response=>{
      this.pollList = response;
    })
    .catch(error=>{
      console.log(error);
    });
  }

  navigateToAddNewPoll()
  {    
    this.router.navigate(['/poll/details']);
  }

  deletePoll(poll : Poll)
  {
    this.pollService.delete(poll.id)
      .then(pollDeleteResponse => {
        const index = this.pollList.indexOf(poll);
        this.pollList.splice(index,1);
        this.showSuccessToast("Se ha eliminado la encuesta correctamente");
      })
      .catch(pollDeleteResponseError=>{
        this.showErrorToast("No se ha podido eliminar la encuesta correctamente");
      });
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

  setPollSelectedToDelete(poll, content)
  {
    this.pollSelectedToDelete = poll;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  
    }, (reason) => { /*Modal no exitoso*/ });
  }

  deletePollSelected(modal)
  {
    if(this.pollSelectedToDelete != null)
    {
      this.pollService.delete(this.pollSelectedToDelete.id)
      .then(pollDeleteResponse => {
        const index = this.pollList.indexOf(this.pollSelectedToDelete);
        this.pollList.splice(index,1);
        this.showSuccessToast("Se ha eliminado la encuesta correctamente");
      })
      .catch(pollDeleteResponseError=>{
        this.showErrorToast("No se ha podido eliminar la encuesta correctamente");
      })
      .finally(() => {
        modal.dismiss();
      })
      ;
  

    }
  }

}
