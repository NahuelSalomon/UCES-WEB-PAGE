import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomValidator } from 'src/app/common/custom-validator';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private userService : UserService) { }

  registerForm = new FormGroup({
    firstname: new FormControl('', [ Validators.required, CustomValidator.lettersOnly()]),
    lastname: new FormControl('', [ Validators.required, CustomValidator.lettersOnly()]),
    email: new FormControl('', [ Validators.required, Validators.email ], [CustomValidator.emailExists(this.userService)] ),
    password: new FormControl('', [Validators.required])
  });

  get firstname() { return this.registerForm.get('firstname') }
  get lastname() { return this.registerForm.get('lastname') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }

  ngOnInit(): void {
  }

  redirectToLogin()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/login';    
    this.router.navigateByUrl(redirect);
  }

  createAccount()
  {
    var user: User = new User(0,this.firstname.value,this.lastname.value,this.email.value,this.password.value,UserType.ROLE_STUDENT);
    console.log(user);
    
    this.authService.register(user)
    .then(response=>{
        
        window.alert('Se ha registrado correctamente');
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/login';    
        this.router.navigateByUrl(redirect);
      
    })
    .catch(response=>{
      window.alert('Ha ocurrido un error. Se ha registrado correctamente');
    });
    
  }

}
