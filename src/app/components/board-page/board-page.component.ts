import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Board } from 'src/app/models/board';
import { Forum } from 'src/app/models/forum';
import { Recommendation } from 'src/app/models/recommendation';
import { TypeForum } from 'src/app/models/type-forum';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {

  @Input() board : Board;
  @Input() typeForum : TypeForum;
  @Input() forumList: Array<Forum>;
  private authListenerSubs: Subscription;
  userType = "ANONYMOUS";

  constructor(private authService : AuthService, private forumService: ForumService) { }

  ngOnInit(): void {

    this.userType = this.authService.typeUser; 

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
      this.typeForum = TypeForum.RECOMMENDATION;
    } else if (typeForum == 'query') {
      this.typeForum = TypeForum.QUERY;
    }

  }

  addForum(){

    var bodyElement = document.getElementById("forumBody");
    var body = bodyElement.innerHTML;
    var user = this.authService.userDetailsUrl;

    if(this.typeForum == TypeForum.RECOMMENDATION) {
      //recommendation: Recommendation = new Recommendation(0, body, user, 0, 0);
    } else if (this.typeForum == TypeForum.QUERY) {
      
    }
  }

}
