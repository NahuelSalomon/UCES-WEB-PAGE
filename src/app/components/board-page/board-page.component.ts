import { Component, Input, OnInit } from '@angular/core';
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
  private authListenerSubs: Subscription;
  userType = "ANONYMOUS";

  constructor(private authService : AuthService, private forumService: ForumService, private userService : UserService) { }

  ngOnInit(): void {

    this.typeForum = ForumType.QUERY;
    this.userType = this.authService.userType; 


  }

  changeTypeForum(typeForum : string) {

    /** Se cambia de un tipo de foro a otro tipo de foro */
    var element = document.getElementsByName("active-form-type")[0];
    element.classList.remove("active","active-form-type");
    element.style.backgroundColor = "white";
    element.style.color = "black";
    element.setAttribute("name",""); 
    
    var elementToActive  = document.getElementById(typeForum);
    elementToActive.classList.add("active");
    elementToActive.style.backgroundColor = "#A989B0";
    elementToActive.style.color = "white";
    elementToActive.setAttribute("name","active-form-type"); 

    if(typeForum == 'recommendation') {
      this.typeForum = ForumType.RECOMMENDATION;
    } else if (typeForum == 'query') {
      this.typeForum = ForumType.QUERY;
    }

  }

  addForum(){    
    this.userService.getById(this.authService.idUser)
      .then(response => {
        
             
        var user = response;
        var body = ( <HTMLInputElement> document.getElementById("forumBody")).value;
        var forum: Forum;
        
              
        if(this.typeForum == ForumType.RECOMMENDATION) {
          forum = new Recommendation(0, body, user, 0, 0, this.board);
        } else if (this.typeForum == ForumType.QUERY) {
          forum = new Query(0, body, user, 0, 0, this.board);
        }

        //console.log(this.board.subject);
        

        
       
        if(forum != null){
          console.dir(forum);
          
          if(this.typeForum == ForumType.QUERY) 
          {
            var query : Query = new Query(0, body, user, 0, 0, this.board);
            this.forumService.addQuery(query)
            .then(response => {
              window.alert("Se ha agregado la "+ forum.forumType.toLowerCase() +" correctamente");
            })
            .catch(error => {
              window.alert("Se ha producido un error");
            })

          }
          
          /* this.forumService.add(forum)
          .then(response => {
            window.alert("Se ha agregado la "+ forum.forumType.toLowerCase() +" correctamente");
          })
          .catch(error => {
            window.alert("Se ha producido un error");
          })
 */
        }

      })
      .catch(error=>{
        console.log(error);
        
      })

  }

}
