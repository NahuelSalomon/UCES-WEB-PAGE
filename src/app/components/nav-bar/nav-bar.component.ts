import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Career } from 'src/app/models/career';
import { CareerService } from 'src/app/services/career.service';

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

    console.log(this.userType)

    this.authListenerSubs = this.authService
      .getAuthStatuesListener().subscribe(actualType =>{
        this.userType = actualType;
        console.log(actualType)
      });

    console.log(this.userType)
  }
  
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('login');
  }
  

}
