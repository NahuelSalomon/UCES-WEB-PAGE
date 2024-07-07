import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomValidator } from 'src/app/common/custom-validator';
import { HiddenData } from 'src/app/models/hidden-data';
import { SendEmailRequest } from 'src/app/models/send-email-request';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { EmailSenderService } from 'src/app/services/email-sender.service';
import { HiddenDataService } from 'src/app/services/hidden-data.service';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Byte } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstname: new FormControl('', [ Validators.required, CustomValidator.lettersOnly()]),
    lastname: new FormControl('', [ Validators.required, CustomValidator.lettersOnly()]),
    email: new FormControl('', [ Validators.required, Validators.email ], [CustomValidator.emailExists(this.userService)] ),
    password: new FormControl('', [Validators.required, CustomValidator.password1Upper1Lower1NumberMin8()]),
    passwordRepeat: new FormControl('', [Validators.required])

  }, CustomValidator.mustMatch('password', 'passwordRepeat'));

  get firstname() { return this.registerForm.get('firstname') }
  get lastname() { return this.registerForm.get('lastname') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm?.get('password')}
  get passwordRepeat() { return this.registerForm.get('passwordRepeat')}
  isLoadingCreateAccount: boolean = false;
  defaultImage = '/assets/images/default-avatar-image.jpg';
  selectedImageUrl: string;
  selectedImageBytes: Array<Byte>;;

  constructor(private authService: AuthService, private router: Router, private userService : UserService, 
              private hiddenDataService: HiddenDataService,private emailSenderService : EmailSenderService,private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
  }

  redirectToLogin()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/login';    
    this.router.navigateByUrl(redirect);
  }

  createAccount()
  {
    this.isLoadingCreateAccount = true;
    var user: User = new User(0,this.firstname.value,this.lastname.value,this.email.value,this.password.value,UserType.ROLE_STUDENT,true, this.selectedImageBytes);
    this.authService.register(user)
    .then(tokenResponse=>{
        var request = new SendEmailRequest(user.email,`http://localhost:4200/email-confirmed`);
        console.log(request);
        
        this.emailSenderService.confirmEmail(new SendEmailRequest(user.email,`http://localhost:4200/email-confirmed`)).then(response=>{
          this.hiddenDataService.receiveData(new HiddenData(user, tokenResponse));
          let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/confirm-email';    
          this.router.navigateByUrl(redirect);
          this.isLoadingCreateAccount = false;
        }).catch(error=>{});
    })
    .catch(response=>{
      console.log(response);
      
      window.alert('Ha ocurrido un error');
      this.isLoadingCreateAccount = false;
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uInt8Array = new Uint8Array(arrayBuffer);
      this.selectedImageBytes = Array.from(new Uint8Array(uInt8Array));
      const blob = new Blob([uInt8Array], { type: file.type });
      this.selectedImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)) as string;
    };

    reader.readAsArrayBuffer(file);
  }

  onImageError()
  {
    this.selectedImageBytes = null;
    this.selectedImageUrl = null;
  }
  
}
