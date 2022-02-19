import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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

  constructor(private careerService : CareerService) {}



  ngOnInit(): void {
    
    this.careerService.getAll()
    .then(response => {
      this.careerList = response;
    })
    .catch(err=> console.log(err));
    
  }
  
}