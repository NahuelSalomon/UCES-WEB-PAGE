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

@Component({
  selector: 'board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {

  @Input() board : Board;
  forumType : ForumType;
  forumList: Array<Forum>;
  queryForumType : ForumType = ForumType.QUERY; 
  userType = "ANONYMOUS";
  recommendationIsSelected = false;
  showToastSuccess : boolean = false;
  showToastError: boolean = false;

  constructor(private authService : AuthService, private forumService: ForumService, private userService : UserService) { }

  ngOnInit(): void {
    this.forumType = ForumType.QUERY;
    this.userType = this.authService.userType; 
    this.getForumList();
  }

  changeForumType() {
    console.log(this.board);
    
    this.recommendationIsSelected = !this.recommendationIsSelected;  
    this.forumType = this.recommendationIsSelected ? ForumType.RECOMMENDATION : ForumType.QUERY;  
    this.getForumList();
        
  }

  getForumList()
  {    
    var promiseToGetForumList = this.recommendationIsSelected ? 
    this.forumService.getAllRecommendationssByBoard(this.board.id) : 
    this.forumService.getAllQueriesByBoard(this.board.id); 
      promiseToGetForumList
        .then(forumResponse=>{

        this.forumList = forumResponse['content'];
        
        })
        .catch(forumResponseError=>{});
  }

  addForum(){    

    this.userService.getById(this.authService.idUser)
      .then(response => {
        var user = response;
        var body = ( <HTMLInputElement> document.getElementById("forumBody")).value;
        var forum: Forum = this.forumType == ForumType.RECOMMENDATION ?  
        new Recommendation(0, body, user, 0, 0, this.board) :
        (this.forumType == ForumType.QUERY ? forum = new Query(0, body, user, 0, 0, this.board) : null);

        if(forum != null){
          this.forumService.add(forum)
          .then(response => {
            this.forumList.push(forum);            
            this.showToastSuccess = true;
          })
          .catch(error => {
            this.showToastError = true;
            //window.alert("Se ha producido un error");
          })
        }

        

        ( <HTMLInputElement> document.getElementById("forumBody")).value = "";

      })
      .catch(error=>{
        
      })

  }

}
