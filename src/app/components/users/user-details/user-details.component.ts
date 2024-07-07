import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomValidator } from 'src/app/common/custom-validator';
import { Toast } from 'src/app/models/toast';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { EmailSenderService } from 'src/app/services/email-sender.service';
import { HiddenDataService } from 'src/app/services/hidden-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  defaultImage = '/assets/images/default-avatar-image.jpg';
  selectedImageUrl: string;
  selectedImageBytes: Array<Byte>;
  toasts: Array<Toast> = new Array<Toast>();
  isUpdatingUser: boolean = false;

  updateUserForm = new FormGroup({
    password: new FormControl('', [Validators.required, CustomValidator.password1Upper1Lower1NumberMin8()]),
    passwordRepeat: new FormControl('', [Validators.required]),
    passwordChange: new FormControl(false)
  }, CustomValidator.mustMatch('password', 'passwordRepeat'));

  get password() { return this.updateUserForm?.get('password')}
  get passwordRepeat() { return this.updateUserForm.get('passwordRepeat')}
  get passwordChange() { return this.updateUserForm.get('passwordChange')}

  constructor(private authService: AuthService, private router: Router, private userService : UserService, 
    private hiddenDataService: HiddenDataService,private emailSenderService : EmailSenderService,private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    this.authService.getUserDetails(sessionStorage.getItem('token'))
      .then(response => {
        this.user = response;
        this.convertBytesFromUserToImage(this.user.image);
      })
      .catch(error => {              
        
      })
  }

  redirectToHome()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/career/page/1';    
    this.router.navigateByUrl(redirect);
  }

  updateUser()
  {
    this.isUpdatingUser = true;
    var user: User = new User(this.user.id,this.user.firstname,this.user.lastname,this.user.email,this.password.value,UserType.ROLE_STUDENT,true, this.selectedImageBytes);
    this.userService.update(user, sessionStorage.getItem('token'))
    .then(response=>{
        if(this.passwordChange.value)
        {
            this.userService.resetPassword(user.id, this.password.value , sessionStorage.getItem('token'))
            .then(response=>{
                this.showSuccessToast("Su información de cuenta se ha actualizado correctamente");
                this.isUpdatingUser = false;
             })
            .catch(errorResponse=>{
                this.showWarningToast("Su información se actualizó correctamente pero hubo un error al cambiar la contraseña");
                this.isUpdatingUser = false;
            });    
        }
        else
        {
          this.showSuccessToast("Su información de cuenta se ha actualizado correctamente");
          this.isUpdatingUser = false;
        }
    })
    .catch(errorResponse=>{
      this.showErrorToast("Ha ocurrido un error al actualizar su información de cuenta");
      this.isUpdatingUser = false;
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

  quitImage()
  {
    this.selectedImageBytes = null;
    this.selectedImageUrl = null;
  }

  convertBytesFromUserToImage(bytes)
  {
    if(bytes != null)
    {
      const uInt8Array = Uint8Array.from(atob(bytes), c => c.charCodeAt(0));
      const blob = new Blob([uInt8Array], { type: 'application/octet-stream' });
      this.selectedImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)) as string;
    }
    
  }

  showSuccessToast(toastBody: string)
  {
    this.toasts.push({class: "success-alert", delay:2000, body: toastBody,iconClass: "fa-solid fa-circle-check"});
  }

  showErrorToast(toastBody: string)
  {
    this.toasts.push({class: "error-alert", delay:2000, body: toastBody,iconClass: "fa-solid fa-circle-xmark"});
  }

  showWarningToast(toastBody: string)
  {
    this.toasts.push({class: "warning-alert", delay:2000, body: toastBody,iconClass: "fa-solid fa-triangle-exclamation"});
  }

  removeToast(toast)
  {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
    
  }

}
