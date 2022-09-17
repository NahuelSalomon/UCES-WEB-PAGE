import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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

@Component({
  selector: 'board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {

  @Input() board: Board;
  forumType: ForumType;
  forumList: Array<Forum>;
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
    this.userType = this.authService.userType;
    this.setForumList();
    
    this.responseQueryForm = new FormGroup({});
  }

  changeForumType() {
    this.recommendationIsSelected = !this.recommendationIsSelected;
    this.forumType = this.recommendationIsSelected ? ForumType.RECOMMENDATION : ForumType.QUERY;
    this.setForumList();

  }

  setForumList() {
    var promiseToGetForumList = this.recommendationIsSelected ?
      this.forumService.getAllRecommendationssByBoard(this.board.id) :
      this.forumService.getAllQueriesByBoard(this.board.id);
    promiseToGetForumList
      .then(forumResponse => {

        this.forumList = forumResponse;
        this.forumList.forEach(forum=>{ 
          var formControl : FormControl = new FormControl('', [ Validators.required ]);
          formControl.disable(); 
          this.responseQueryForm.addControl("bodyQueryResponse"+forum.id,formControl); 
        });

      })
      .catch(forumResponseError => { });
  }

  isQueryResponseValid(idQuery: number)
  {
    return this.getBodyQueryResponseControl("bodyQueryResponse"+idQuery).valid;
  }

  addResponseQuery(forum: Forum) {
    this.userService.getById(this.authService.idUser)
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

  addForum() {

    this.userService.getById(this.authService.idUser)
      .then(response => {
        var user = response;
        var body = this.body.value;
 

        var forum: Forum = this.forumType == ForumType.RECOMMENDATION ?
          new Recommendation(0, body, user, 0, 0, this.board) :
          (this.forumType == ForumType.QUERY ? forum = new Query(0, body, user, 0, 0, this.board) : null);

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

}
