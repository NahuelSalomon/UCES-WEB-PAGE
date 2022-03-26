import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Career } from './models/career';
import { CareerService } from './services/career.service';
import { ForumService } from './services/forum.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'UCES-WEB-PAGE';
  careerList: Array<Career>;
  private authListenerSubs: Subscription;
  userType = "ANONYMOUS";

  constructor(private route : ActivatedRoute, private careerService : CareerService, private authService : AuthService) {}



  ngOnInit(): void {
    
    this.careerService.getAll()
    .then(response => {
      this.careerList = response;
    })
    .catch(err=> console.log(err))

    this.authListenerSubs = this.authService
      .getAuthStatuesListener().subscribe(actualType =>{
        this.userType = actualType;
      });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
  
}