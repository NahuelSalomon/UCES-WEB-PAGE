import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomValidator } from 'src/app/common/custom-validator';
import { HiddenData } from 'src/app/models/hidden-data';
import { SendEmailConfirmEmailRequest } from 'src/app/models/send-email-confirm-email-request';
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
  showToastSuccess : boolean = false;
  showToastError: boolean = false;
  sendingEmail = false;
  

  updateEmailForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ], [CustomValidator.emailExists(this.userService)] ),
  });

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
    console.log(this.hiddenData.token);
    
    this.emailSenderService.confirmEmail(new SendEmailConfirmEmailRequest(this.hiddenData.user.email,`http://localhost:4200/email-confirmed?token=`+this.hiddenData.token)).then(response=>{
      this.showToastSuccess = true;
      this.sendingEmail = false;
    }).catch(error=>{
      this.showToastError = true;
      this.sendingEmail = false;
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
      
    }, (reason) => { /*Modal no exitoso*/ });
  }


}

