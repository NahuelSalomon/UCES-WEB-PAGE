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
  queryForumType: ForumType = ForumType.QUERY;
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

  
  constructor(private authService: AuthService, private forumService: ForumService, private userService: UserService, private queryResponseService: ResponseQueryService) { }

  ngOnInit(): void {
    this.forumType = ForumType.QUERY;
    this.userType = this.authService.userType;
    this.setForumList();
    
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

      })
      .catch(forumResponseError => { });
  }


  addResponseQuery(idQuery: number) {

    this.userService.getById(this.authService.idUser)
      .then(userResponse => {
        this.forumService.getById(idQuery)
          .then(forumResponse => {
            var queryResponse: QueryResponse = new QueryResponse(0, "", userResponse, forumResponse);
            this.queryResponseService.add(queryResponse)
              .then(queryResponseResponse => {
                this.textToastSuccess = "La respuesta a la consulta se ha agregado con exito";
                this.showToastSuccess = true;
              })
              .catch(errorQueryResponse => {
                this.textToastError = "Se ha producido un error al agregar la respuesta a la consulta";
                this.showToastError = true;
              });
          })
          .catch(errorForumResponse => {
            this.textToastError = "Se ha producido un error al agregar la respuesta a la consulta";
            this.showToastError = true;
          });
      })
      .catch(errorUserResponse => {
        this.textToastError = "Se ha producido un error al agregar la respuesta a la consulta";
        this.showToastError = true;
      });





  }

  addForum() {

    this.userService.getById(this.authService.idUser)
      .then(response => {
        var user = response;
        var body = this.body.value;
        console.log("body" + body);

        var forum: Forum = this.forumType == ForumType.RECOMMENDATION ?
          new Recommendation(0, body, user, 0, 0, this.board) :
          (this.forumType == ForumType.QUERY ? forum = new Query(0, body, user, 0, 0, this.board) : null);

        if (forum != null) {
          this.forumService.add(forum)
            .then(response => {
              this.forumList.push(forum);

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
