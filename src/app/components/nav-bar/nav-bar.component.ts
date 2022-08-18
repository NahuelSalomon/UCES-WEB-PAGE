import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Career } from 'src/app/models/career';
import { CareerService } from 'src/app/services/career.service';
import { SubjectListComponent } from '../subjects/subject-list/subject-list.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  careerList: Array<Career>;
  private authListenerSubs: Subscription;
  userType: string;

  constructor(private router : Router, private careerService : CareerService, private authService : AuthService) {}


  ngOnInit(): void {

    this.careerService.getAll()
    .then(response => {
      this.careerList = response;
    })
    .catch(err=> console.log(err))

    this.userType = sessionStorage.getItem('userType');

    this.authListenerSubs = this.authService
      .getAuthStatuesListener().subscribe(actualType =>{
        this.userType = actualType;
        console.log(actualType)
      });

  }
  
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('login');
  }
  

}
