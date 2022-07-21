import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    firstname: new FormControl('', [ Validators.required]),
    lastname: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [Validators.required])
  });

  get firstname() { return this.loginForm.get('firstname').value }
  get lastname() { return this.loginForm.get('lastname').value }
  get email() { return this.loginForm.get('email').value }
  get password() { return this.loginForm.get('password').value }

  ngOnInit(): void {
  }

  redirectToLogin()
  {
    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/login';    
    this.router.navigateByUrl(redirect);
  }

  createAccount()
  {
    var user: User = new User(0,this.firstname,this.lastname,this.email,this.password,UserType.ROLE_STUDENT);
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
