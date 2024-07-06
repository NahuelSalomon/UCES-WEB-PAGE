import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Board } from 'src/app/models/board';
import { Forum } from 'src/app/models/forum';
import { Recommendation } from 'src/app/models/recommendation';
import { Query } from 'src/app/models/query';
import { ForumType } from 'src/app/models/forum-type';
import { ForumService } from 'src/app/services/forum.service';
import { UserService } from 'src/app/services/user.service';
import { QueryResponse } from 'src/app/models/query-response';
import { User } from 'src/app/models/user';
import { ResponseQueryService } from 'src/app/services/query-response.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumOrder } from 'src/app/models/forum-order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PollService } from 'src/app/services/poll.service';
import { Toast } from 'src/app/models/toast';
import { Poll } from 'src/app/models/poll';
import { Byte } from '@angular/compiler/src/util';
import { DomSanitizer } from '@angular/platform-browser';
import { PollResultService } from 'src/app/services/poll-result.service';

@Component({
  selector: 'board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {

  @Input() board: Board;
  @Input() orderTypeSelected: ForumOrder;

  forumType: ForumType;
  forumList: Array<Forum>;
  forumLikedUser: Array<Forum> = new Array<Forum>();
  userType = "ANONYMOUS";
  recommendationIsSelected = false;
  toasts: Array<Toast> = new Array<Toast>();
  totalForums: number;
  numberOfPages: number;
  sizeOfPages: number;
  currentPageNumber: number;
  forumForm = new FormGroup({
    body: new FormControl('', [Validators.required])
  });
  responseQueryForm: FormGroup;
  subjectPoll: Poll;

  get body() { return this.forumForm.get('body') }

  constructor(private authService: AuthService, private forumService: ForumService, private userService: UserService, 
              private queryResponseService: ResponseQueryService, private modalService: NgbModal, 
              private pollService: PollService, private sanitizer: DomSanitizer, private pollResultService: PollResultService) {
    this.currentPageNumber = 1;
    this.sizeOfPages = 3;
    this.numberOfPages = 0;
  }

  ngOnInit(): void {

    
    this.forumType = ForumType.QUERY;
    this.userType = sessionStorage.getItem('userType');
    this.setForumList();

    this.responseQueryForm = new FormGroup({});
    this.setForumsLikedUser();
  }

  /*we got here when we changed the subject*/ 
  ngOnChanges(changes: SimpleChanges) {
    this.currentPageNumber = 1;
    this.setForumList();
    this.setSubjectPoll();
  }

  getBodyQueryResponseControl(name: string) { return this.responseQueryForm.get(name); }

  changeForumType() {
    this.recommendationIsSelected = !this.recommendationIsSelected;
    this.forumType = this.recommendationIsSelected ? ForumType.RECOMMENDATION : ForumType.QUERY;
    this.currentPageNumber = 1;
    this.setForumList();

  }

  setForumList() {
    var promiseToGetForumList =
      this.recommendationIsSelected ?
        (this.orderTypeSelected == ForumOrder.ORDER_BY_DATE ?
          this.forumService.getAllRecommendationsByBoardSortedByDate(this.board.id, this.currentPageNumber - 1, this.sizeOfPages) :
          this.forumService.getAllRecommendationsByBoardSortedByVotes(this.board.id, this.currentPageNumber - 1, this.sizeOfPages))
        :
        (this.orderTypeSelected == ForumOrder.ORDER_BY_DATE ?
          this.forumService.getAllQueriesByBoardSortedByDate(this.board.id, this.currentPageNumber - 1, this.sizeOfPages) :
          this.forumService.getAllQueriesByBoardSortedByVotes(this.board.id, this.currentPageNumber - 1, this.sizeOfPages))

    promiseToGetForumList
      .then(forumResponse => {
        this.forumList = forumResponse.body;
        
        if (forumResponse != null) {
          this.numberOfPages = forumResponse.headers.get("X-Total-Pages");
          this.totalForums = forumResponse.headers.get("X-Total-Count");
          this.forumList.forEach(forum => {
            var formControl: FormControl = new FormControl('', [Validators.required]);
            formControl.disable();
            this.responseQueryForm.addControl("bodyQueryResponse" + forum.id, formControl);
          });
        }
      })
      .catch(forumResponseError => { });
  }

  setForumsLikedUser() {
    this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(userResponse => {
        this.forumLikedUser = userResponse.forumsVoted;
      })
      .catch(error => { });
  }

  setSubjectPoll()
  {
    this.pollService.getBySubjectId(this.board.subject.id)
      .then(pollResponse=>{
        this.subjectPoll = pollResponse;
      })
      .catch(errorPollResponse=>{

      })
  }

  isQueryResponseValid(idQuery: number) {
    return this.getBodyQueryResponseControl("bodyQueryResponse" + idQuery).valid;
  }

  addResponseQuery(forum: Forum) {
    this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(userResponse => {

        var body = this.getBodyQueryResponseControl("bodyQueryResponse" + forum.id).value;
        var queryResponse: QueryResponse = new QueryResponse(0, body, userResponse, forum);
        this.queryResponseService.add(queryResponse, this.authService.token)
          .then(queryResponseResponse => {
            this.showSuccessToast("La respuesta a la consulta se ha agregado con exito");  
            this.setForumList();
          })
          .catch(errorQueryResponse => {
            this.showErrorToast("Se ha producido un error al agregar la respuesta a la consulta");
          });
        this.responseQueryForm.reset();
      })
      .catch(errorUserResponse => {
        this.showErrorToast("Se ha producido un error al agregar la respuesta a la consulta");
      });
  }

  showQueryResponsesForum(forum: Forum) {
    var control = this.getBodyQueryResponseControl("bodyQueryResponse" + forum.id);

    if (control.disabled) {
      control.enable();
    } else {
      control.disable();
    }
  }

  responseQuery(forum: Forum) {
    var value: string = "bodyQueryResponse" + forum.id;
    var control = this.getBodyQueryResponseControl(value);

    control.enable();

    setTimeout(() => {
      var element = document.getElementById(value);
      element.focus();
    }, 0);

  }

  isEnabledQueryResponsesControl(forum: Forum): boolean {
    return this.getBodyQueryResponseControl("bodyQueryResponse" + forum.id).enabled;
  }

  forumRecommendedByTheLoggedUser(forum: Forum): boolean {
    return this.forumLikedUser.some(f => f.id === forum.id);
  }

  addForum() {
    this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(response => {
        var user = response;
        var body = this.body.value;
        var forum: Forum = this.forumType == ForumType.RECOMMENDATION ?
          new Recommendation(0, body, new Date(), user, this.board) :
          (this.forumType == ForumType.QUERY ? forum = new Query(0, body, new Date(), user, this.board) : null);

        if (forum != null) {
          this.forumService.add(forum, this.authService.token)
            .then(response => {
              this.setForumList();
              this.showSuccessToast("El foro se ha agregado con éxito");  
            })
            .catch(error => {
              this.showErrorToast("Se ha producido un error al agregar el foro");
            })
        }
        this.forumForm.reset();
      })
      .catch(error => {              
        this.showErrorToast("Se ha producido un error al agregar el foro");
      })
  }

  pageChange(page) {
    this.setForumList();
  }

  voteUnVoteForum(forum: Forum) {
    this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(userResponse => {
        var user = userResponse;
        this.userService.votedUnVoteForum(user.id, forum.id, this.authService.token)
          .then(response => {
            if (this.forumRecommendedByTheLoggedUser(forum)) {
              this.setForumsLikedUser();
              this.setForumList();
            } else {
              this.setForumsLikedUser();
              this.setForumList();
            }

          })
          .catch(error => {

          });
      })
      .catch(userError => {
      });
  }

  openModal(content) {

    this.pollService.getBySubjectId(this.board.subject.id)
      .then(pollResponse => {

        this.authService.getUserDetails(sessionStorage.getItem('token'))
          .then(userResponse => {

            this.pollResultService.getByPollAndUser(pollResponse.id,userResponse.id)
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
      })
      .catch(errorPollResponse => {
        console.log(errorPollResponse);
        this.showErrorToast("Ha ocurrido un error al mostrar la encuesta");
      });
  }

  pollSuccessfulResultEvent(result) {
    if (result) {
      this.showSuccessToast("La ecuesta se ha enviado de manera exitosa");
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

  removeToast(toast)
  {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
    
  }

  convertBytesToImage(bytes)
  {
    if(bytes != null)
    {
      const uInt8Array = Uint8Array.from(atob(bytes), c => c.charCodeAt(0));
      const blob = new Blob([uInt8Array], { type: 'application/octet-stream' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)) as string;
    }
    return '../../../assets/images/default-avatar-image.jpg';
  }

}
