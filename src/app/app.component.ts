import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ForumService } from './services/forum.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UCES-WEB-PAGE';
  hello = "";


  constructor(private userService: UserService, private forumService: ForumService) {}

  ngOnInit(): void {
    /*this.userService.sayHello()
      .then(response=> {
        console.log(response)
        this.hello = this.hello+response;
      }) 
      .catch(error=> console.log(error));*/

    this.forumService.getAll()
    .then(response=> console.log(response))
    .catch(err => console.log(err));
  }
  
}
