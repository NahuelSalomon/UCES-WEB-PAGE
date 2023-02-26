import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { iif, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Board } from 'src/app/models/board';
import { Career } from 'src/app/models/career';
import { Forum } from 'src/app/models/forum';
import { Subject } from 'src/app/models/subject';
import { Subject as SubjectRxjs } from 'rxjs' ;
import { ForumType } from 'src/app/models/forum-type';
import { CareerService } from 'src/app/services/career.service';
import { SubjectService } from 'src/app/services/subject.service';
import { BoardService } from 'src/app/services/board.service';
import { ForumService } from 'src/app/services/forum.service';
import { ForumOrder,ForumOrderDescription,ForumOrderLabel } from 'src/app/models/forum-order';
import { Poll } from 'src/app/models/poll';
import { PollService } from 'src/app/services/poll.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PollUserService } from 'src/app/services/poll-user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-career-page',
  templateUrl: './career-page.component.html',
  styleUrls: ['./career-page.component.css']
})
export class CareerPageComponent implements OnInit {

  constructor(private route :ActivatedRoute, private router: Router, private careerService: CareerService, 
              private subjectService: SubjectService, private boardSevice : BoardService, private forumService: ForumService, 
              private pollService: PollService,private modalService: NgbModal, private pollUserService: PollUserService, private authService: AuthService) { }

  career: Career;
  subjectSelected: Subject;
  subjectList: Array<Subject>;
  forumList: Array<Forum>;
  board : Board;
  careerPoll: Poll;
  forumType: ForumType;
  listOrderTypes: Array<ForumOrderDescription>;
  orderTypeSelected: ForumOrder;
  toasts: Array<Toast> = new Array<Toast>();
  

  ngOnInit(): void {      
    this.listOrderTypes = ForumOrderLabel;
    this.orderTypeSelected = ForumOrder.ORDER_BY_DATE;
    
    this.forumType = ForumType.QUERY;
    this.route.params.subscribe(params => {
      this.careerService.getById(params.id)
        .then(response => {
          this.career = response;
          this.subjectService.getByCareer(this.career.id)    
            .then(responseSubjectList => {
              this.subjectList = responseSubjectList;
                this.subjectSelected = this.subjectList[0];
                  this.boardSevice.getBySubject(this.subjectSelected.id).then((responseBoard)=>{        
                    this.board = responseBoard;
              });   
            })
            .catch(err => console.log(err));
            this.setCareerPoll();
        })
        .catch(err => console.log(err));
      })
  }

  subjectChange(value: string){    
    var idSubject = Number.parseInt(value);
    this.subjectService.getById(idSubject).then((response) =>{
      this.subjectSelected = response;
      
      this.boardSevice.getBySubject(this.subjectSelected.id).then((responseBoard)=>{        
        this.board = responseBoard;
       
      });      
    })
    .catch((error) =>{
      console.log(error)
    });
  }

  callPollByCareer(idCareer: number){
    this.router.navigate(["career/poll/" + this.career.id])
  }

  setCareerPoll()
  {
    this.pollService.getByCareerId(this.career.id)
      .then(pollResponse=>{
        this.careerPoll = pollResponse;
      })
      .catch(errorResponse=>{

      })
  }

  pollSuccessfulResultEvent(result)
  {
    if (result) {
      this.showSuccessToast("La ecuesta se ha enviado de manera exitosa");
    }
    else {
      this.showErrorToast("Ha ocurrido un error al enviar la encuesta");
    }
  }

  openModal(content) {
        this.authService.getUserDetails(sessionStorage.getItem('token'))
          .then(userResponse => {

            this.pollUserService.getByPollAndUser(this.careerPoll.id,userResponse.id)
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
                this.showErrorToast("Ha ocurrido un error al mostrar la encuesta");
            })
          })
          .catch(errorUserResponse => {
            this.showErrorToast("Ha ocurrido un error al mostrar la encuesta");
          })
     
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

}
