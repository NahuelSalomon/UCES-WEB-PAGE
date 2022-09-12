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
  @Input() typeForum : ForumType;
  @Input() forumList: Array<Forum>;
  forumTypeQuery : ForumType = ForumType.QUERY; 
  userType = "ANONYMOUS";
  recommendationIsSelected = false;
  showToastSuccess : boolean = false;
  showToastError: boolean = false;

  constructor(private authService : AuthService, private forumService: ForumService, private userService : UserService) { }

  ngOnInit(): void {
    this.typeForum = ForumType.QUERY;
    this.userType = this.authService.userType; 
  }

  

  changeForumType() {
    

    this.recommendationIsSelected = !this.recommendationIsSelected;  

    if(this.recommendationIsSelected) {
      this.typeForum = ForumType.RECOMMENDATION;
    } else  {
      this.typeForum = ForumType.QUERY;
    }

    console.log(this.forumList);
    
  }

  addForum(){    

    this.userService.getById(this.authService.idUser)
      .then(response => {
        
             
        var user = response;
        var body = ( <HTMLInputElement> document.getElementById("forumBody")).value;
       
        
        var forum: Forum = this.typeForum == ForumType.RECOMMENDATION ?  
        new Recommendation(0, body, user, 0, 0, this.board) :
        (this.typeForum == ForumType.QUERY ? forum = new Query(0, body, user, 0, 0, this.board) : null);

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
        console.log(error);
        
      })

  }

}
