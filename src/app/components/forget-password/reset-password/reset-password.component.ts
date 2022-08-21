import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomValidator } from 'src/app/common/custom-validator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  validUrl : boolean = true;
  user: User;
  token: string;
  resetSuccess: boolean = null;

  constructor(private authService: AuthService,private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    var url = this.router.parseUrl(this.router.url);
  
    var token = url.queryParams['token'] || null;
    
    if(token == null)
    {
     this.redirectToLogin();
    }
    else
    {
      this.token = token;
      this.authService.getUserDetails(token)
      .then(responseUserDetails=>{
        this.validUrl = true;
        this.user = responseUserDetails;
        
        })
        .catch(errorConfirmEmail=>{ this.validUrl = false; });
      }
    }
  

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, CustomValidator.password1Upper1Lower1NumberMin8()]),
    passwordRepeat: new FormControl('', [Validators.required])

  }, CustomValidator.mustMatch('password', 'passwordRepeat'));

  get password() { return this.resetPasswordForm?.get('password')}
  get passwordRepeat() { return this.resetPasswordForm.get('passwordRepeat')}

  redirectToLogin()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'login';    
    this.router.navigateByUrl(redirect);
  }

  resetPassword()
  {
    this.userService.resetPassword(this.user.id,this.password.value,this.token)
    .then(responseResetPassword =>{
      this.resetSuccess = true;
    })
    .catch(errorResetPassword=>{ this.resetSuccess = false; });
    
  }
}
