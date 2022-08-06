import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginCredentials } from 'src/app/models/login-credentials';
import { HiddenDataService } from 'src/app/services/hidden-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private hiddenDataService : HiddenDataService) { 
    //this.accessDenied = false;
  }

  accessDenied : boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [Validators.required])
  });


  get email() { return this.loginForm.get('email').value }
  get password() { return this.loginForm.get('password').value }

  redirectToRegister()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/register';
    this.router.navigateByUrl(redirect);

  }

  //  onSubmit(){ 
  //   let userCredentials = new LoginCredentials();
  //   userCredentials.email = this.email;
  //   userCredentials.password = this.password;
    
  //   try{
  //     this.authService.login(userCredentials).then(response=>{
  //     var redirect;      

  //         if(this.authService.token) {

          
  //           /*Esta hardeada la pagina, debe cambiarse hacia algo mas funcional*/
  //           redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'career/page/1';
  //           /*  if(this.authService.userDetails['userTypeId'] == 1) {
  //             linkTypeUser = "/student";
    
  //           }else if(this.authService.userDetails['userTypeId'] == 2) {
  //             linkTypeUser = "/administrator";
  //           }
  //           this.router.navigateByUrl(redirect);   */

  //         } else
  //         {  
  //           redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'confirm-email';
  //         }
  
  //         this.router.navigateByUrl(redirect);
        
        
  //     })
  //     .catch(err=>{
  //       this.accessDenied = true;
  //     });

  //   }
  //   catch(error)
  //   {

  //     this.accessDenied = true;
  //   }
  
  // }

  onSubmit(){ 
    let userCredentials = new LoginCredentials();
    userCredentials.email = this.email;
    userCredentials.password = this.password;
  
    this.authService.login(userCredentials)
    .then(loginResponse=>{
      let obj : {[index: string]:any};
      obj = loginResponse;
      var token = obj['token'];
      this.authService.getUserDetails(token)
      .then(getUserDetailsResponse=>{
        this.authService.setUserDetails(getUserDetailsResponse,token);
        var redirect;
        if(this.authService.token)
        {
          redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'career/page/1';
        } else
        {
          redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'confirm-email';
        }
        this.router.navigateByUrl(redirect);
      })
      .catch(getUserDetailsError=>{});
    })
    .catch(loginError=>{this.accessDenied = true;});
  }
  
  ngOnInit(): void {
  }

}
