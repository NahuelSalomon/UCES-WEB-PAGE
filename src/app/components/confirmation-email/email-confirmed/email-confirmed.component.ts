import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrls: ['./email-confirmed.component.css']
})
export class EmailConfirmedComponent implements OnInit {

  emailConfirmed: boolean = null;

  constructor(private router : Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    var url = this.router.parseUrl(this.router.url);
    var token = url.queryParams['token'] || null;

    if(token == null)
    {
     this.redirectToLogin();
    }
    else
    {
      this.authService.getUserDetails(token)
      .then(responseUserDetails=>{
        console.log("llegue 0");
        
        this.userService.confirmMail(responseUserDetails['id'],token)
        .then(responseConfirmEmail =>{
          console.log("llegue 1");
          this.emailConfirmed = true;
        })
        .catch(errorConfirmEmail=>{ this.emailConfirmed = false; });
      })
      .catch(errorUserDetails=>{ this.emailConfirmed = false});
    }
  }


  redirectToLogin()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'login';    
    this.router.navigateByUrl(redirect);
  }
}
