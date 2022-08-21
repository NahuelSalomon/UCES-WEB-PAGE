import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SendEmailRequest } from 'src/app/models/send-email-request';
import { EmailSenderService } from 'src/app/services/email-sender.service';

@Component({
  selector: 'app-send-email-to-reset-password',
  templateUrl: './send-email-to-reset-password.component.html',
  styleUrls: ['./send-email-to-reset-password.component.css']
})
export class SendEmailToResetPasswordComponent implements OnInit {

  sendingEmail: boolean = false;
  emailSent: boolean = false;

  constructor(private authService: AuthService,private router: Router,private emailSenderService: EmailSenderService) { }

  ngOnInit(): void {
  }


  redirectToLogin()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'login';    
    this.router.navigateByUrl(redirect);
  }

  sendEmail()
  {
    this.sendingEmail = true;    
    this.emailSenderService.resetPassword(new SendEmailRequest(this.email.value,`http://localhost:4200/reset-password`)).then(response=>{
      //this.showToastSuccessSendEmailAgain = true;
      this.sendingEmail = false;
      this.emailSent = true;
    }).catch(error=>{
      //this.showToastErrorSendEmailAgain = true;
      this.sendingEmail = false;
      this.emailSent = true;
    });
  }

  emailForm = new FormGroup({
    email: new FormControl("", [ Validators.required, Validators.email ]),
  });

  get email() { return this.emailForm.get('email') }

}
