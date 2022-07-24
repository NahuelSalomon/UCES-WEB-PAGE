import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomValidator } from 'src/app/common/custom-validator';
import { HiddenData } from 'src/app/models/hidden-data';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { HiddenDataService } from 'src/app/services/hidden-data.service';
import { UserService } from 'src/app/services/user.service';

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
  

  constructor(private authService: AuthService, private router: Router, private userService : UserService, private hiddenDataService: HiddenDataService) { 
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
    var user: User = new User(0,this.firstname.value,this.lastname.value,this.email.value,this.password.value,UserType.ROLE_STUDENT, false);
    
    this.authService.register(user)
    .then(tokenResponse=>{
        
        this.hiddenDataService.receiveData(new HiddenData(user, tokenResponse));
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/confirm-email';    
        this.router.navigateByUrl(redirect);
      
    })
    .catch(response=>{
      window.alert('Ha ocurrido un error. Se ha registrado correctamente');
    });
    
  }

}
