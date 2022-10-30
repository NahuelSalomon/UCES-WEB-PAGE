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
import { ResponseQueryService } from 'src/app/services/response-query.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumOrder } from 'src/app/models/forum-order';

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
  //queryForumType: ForumType = ForumType.QUERY;
  userType = "ANONYMOUS";
  recommendationIsSelected = false;

  textToastSuccess: string;
  textToastError: string;

  showToastSuccess: boolean = false;
  showToastError: boolean = false;

  forumForm = new FormGroup({
    body: new FormControl('', [ Validators.required ])
  });

  responseQueryForm : FormGroup;

  get body() { return this.forumForm.get('body') }

  getBodyQueryResponseControl(name: string) { return this.responseQueryForm.get(name);}
  
  constructor(private authService: AuthService, private forumService: ForumService, private userService: UserService, private queryResponseService: ResponseQueryService) { }

  ngOnInit(): void {
    this.forumType = ForumType.QUERY;    
    this.userType = sessionStorage.getItem('userType');
    this.setForumList();
    
    this.responseQueryForm = new FormGroup({});
    this.setForumsLikedUser();
  
  }

  ngOnChanges(changes: SimpleChanges)
  {        
    this.setForumList();
  }

  changeForumType() {
    this.recommendationIsSelected = !this.recommendationIsSelected;
    this.forumType = this.recommendationIsSelected ? ForumType.RECOMMENDATION : ForumType.QUERY;
    this.setForumList();

  }

  setForumList() {
      var promiseToGetForumList = 
        this.recommendationIsSelected ?
          (this.orderTypeSelected == ForumOrder.ORDER_BY_DATE ? 
            this.forumService.getAllRecommendationsByBoardSortedByDate(this.board.id) : 
            this.forumService.getAllRecommendationsByBoardSortedByVotes(this.board.id))
          :
          (this.orderTypeSelected == ForumOrder.ORDER_BY_DATE ? 
            this.forumService.getAllQueriesByBoardSortedByDate(this.board.id) : 
            this.forumService.getAllQueriesByBoardSortedByVotes(this.board.id))

      promiseToGetForumList
      .then(forumResponse => {
        this.forumList = forumResponse;
        if(forumResponse != null)
        {
          
          this.forumList.forEach(forum=>{ 
            var formControl : FormControl = new FormControl('', [ Validators.required ]);
            formControl.disable(); 
            this.responseQueryForm.addControl("bodyQueryResponse"+forum.id,formControl); 
          });
        }


      })
      .catch(forumResponseError => {  });
  }

  setForumsLikedUser()
  {
    this.authService.getUserDetails(sessionStorage.getItem('token'))
    .then(userResponse=>{
      this.forumLikedUser = userResponse.forumsVoted;
    })
    .catch(error=>{});
  }


  isQueryResponseValid(idQuery: number)
  {
    return this.getBodyQueryResponseControl("bodyQueryResponse"+idQuery).valid;
  }

  addResponseQuery(forum: Forum) {
    this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(userResponse => {

            var body = this.getBodyQueryResponseControl("bodyQueryResponse"+forum.id).value;
            var queryResponse: QueryResponse = new QueryResponse(0,body , userResponse, forum);
            this.queryResponseService.add(queryResponse)
              .then(queryResponseResponse => {


                this.textToastSuccess = "La respuesta a la consulta se ha agregado con exito";
                this.showToastSuccess = true;
                this.setForumList();
              })
              .catch(errorQueryResponse => {
                this.textToastError = "Se ha producido un error al agregar la respuesta a la consulta";
                this.showToastError = true;
              });

              this.responseQueryForm.reset();
          })
      .catch(errorUserResponse => {
        this.textToastError = "Se ha producido un error al agregar la respuesta a la consulta";
        this.showToastError = true;
      });
  }

  showQueryResponsesForum(forum : Forum)
  {
    var control = this.getBodyQueryResponseControl("bodyQueryResponse"+forum.id);

    if(control.disabled)
    {
      control.enable();
    }else
    {
      control.disable();
    }
  }

  responseQuery(forum: Forum)
  {
    var value : string = "bodyQueryResponse"+forum.id;
    var control = this.getBodyQueryResponseControl(value);
    
    control.enable();

    setTimeout(()=>{
      var element = document.getElementById(value);
      element.focus();
    },0);
        
  }

  isEnabledQueryResponsesControl(forum:Forum) : boolean
  {
    return this.getBodyQueryResponseControl("bodyQueryResponse"+forum.id).enabled;
  }

  forumRecommendedByTheLoggedUser(forum : Forum) : boolean
  {    
    return this.forumLikedUser.some(f => f.id === forum.id);
  }

  addForum() {
    this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(response => {
        var user = response;
        var body = this.body.value;
 

        var forum: Forum = this.forumType == ForumType.RECOMMENDATION ?
          new Recommendation(0, body,new Date() , user, this.board) :
          (this.forumType == ForumType.QUERY ? forum = new Query(0, body,new Date(), user, this.board) : null);

        if (forum != null) {
          this.forumService.add(forum)
            .then(response => {
              this.setForumList();

              this.textToastSuccess = "El foro se ha agregado con éxito";
              this.showToastSuccess = true;
            })
            .catch(error => {
              
              this.textToastError = "Se ha producido un error al agregar el foro";
              this.showToastError = true;
            })
        }
        
        this.forumForm.reset();

      })
      .catch(error => {
        this.textToastError = "Se ha producido un error al agregar el foro";
        this.showToastError = true;
      })

  }

  voteUnVoteForum(forum:Forum)
  {
    this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(userResponse => {
        var user = userResponse;
        this.userService.votedUnVoteForum(user.id, forum.id)   
        .then(response=>{
          if(this.forumRecommendedByTheLoggedUser(forum))
          {
            this.setForumsLikedUser();
            this.setForumList();
          }else
          {
            this.setForumsLikedUser();
            this.setForumList();
          }

          
        })
        .catch(error=>{

        });


      })
      .catch(userError=>{

      });
   
   
  }

}
