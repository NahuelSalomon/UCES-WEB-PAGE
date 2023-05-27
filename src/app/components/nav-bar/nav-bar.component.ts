import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Career } from 'src/app/models/career';
import { CareerService } from 'src/app/services/career.service';
import { SubjectListComponent } from '../subjects/subject-list/subject-list.component';
import { User } from 'src/app/models/user';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  careerList: Array<Career>;
  private authListenerSubs: Subscription;
  userType: string;
  user : User;

  constructor(private router : Router, private careerService : CareerService, private authService : AuthService, private sanitizer: DomSanitizer) {}


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
        //console.log(actualType)
      });

      this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(response => {
        this.user = response;
        console.log(this.user.firstname);
        
      })
      .catch(error => {              
        //this.showErrorToast("Se ha producido un error al agregar el foro");
      })

  }
  
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('login');
  }
  
  convertBytesToImage(bytes)
  {
    if(bytes != null)
    {
      const uInt8Array = Uint8Array.from(atob(bytes), c => c.charCodeAt(0));
      const blob = new Blob([uInt8Array], { type: 'application/octet-stream' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)) as string;
    }
    return '../../../assets/images/default-avatar-image.jpg';
  }

}
