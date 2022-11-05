import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomValidator } from 'src/app/common/custom-validator';
import { HiddenData } from 'src/app/models/hidden-data';
import { SendEmailRequest } from 'src/app/models/send-email-request';
import { User } from 'src/app/models/user';
import { EmailSenderService } from 'src/app/services/email-sender.service';
import { HiddenDataService } from 'src/app/services/hidden-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,private hiddenDataService: HiddenDataService, 
              private emailSenderService: EmailSenderService, private modalService: NgbModal, private userService : UserService) { }

  hiddenData : HiddenData;
  showToastSuccessSendEmailAgain : boolean = false;
  showToastErrorSendEmailAgain: boolean = false;

  showToastSuccessSendEmailForChange: boolean = false;
  showToastErrorSendEmailForChange: boolean = false;

  sendingEmail = false;
  


  get email() { return this.updateEmailForm.get('email') }

  ngOnInit(): void {    
    if(this.hiddenDataService.getData() == null)
    {
      this.redirectToLogin();
    }else
    {
      this.hiddenData = this.hiddenDataService.getData();
    }
  }

  updateEmailForm = new FormGroup({
    email: new FormControl(this.hiddenDataService.getData().user.email, [ Validators.required, Validators.email ], [CustomValidator.emailExists(this.userService)] ),
  });

  ngOnDestroy()
  {    
   this.hiddenDataService.clearData();
  }

  redirectToLogin()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'login';    
    this.router.navigateByUrl(redirect);
  }

  sendEmailAgain()
  {
    this.sendingEmail = true;    
    this.emailSenderService.confirmEmail(new SendEmailRequest(this.hiddenData.user.email,`http://localhost:4200/email-confirmed`+this.hiddenData.token)).then(response=>{
      this.showToastSuccessSendEmailAgain = true;
      this.sendingEmail = false;
    }).catch(error=>{
      this.showToastErrorSendEmailAgain = true;
      this.sendingEmail = false;
    });
  }

  open(content) {
    this.sendingEmail = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(this.email.value != this.hiddenData.user.email) 
      {
        var user = this.hiddenData.user;
        user.email = this.email.value;
        this.userService.update(user, this.hiddenData.token).then(response => {
          var sendEmailConfirmEmailRequest = new SendEmailRequest(this.hiddenData.user.email,`http://localhost:4200/email-confirmed`);
          this.emailSenderService.confirmEmail(sendEmailConfirmEmailRequest)
          .then(response => {
            this.showToastSuccessSendEmailForChange = true;
          })
          .catch(error => {this.showToastErrorSendEmailForChange = true;});
          
        }).catch(error=>{});
      }
    }, (reason) => { /*Modal no exitoso*/ });
    this.sendingEmail = false;
  }


}

