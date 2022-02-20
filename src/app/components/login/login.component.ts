import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials } from 'src/app/models/login-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [Validators.required])
  });

  get email() { return this.loginForm.get('email').value }
  get password() { return this.loginForm.get('password').value }

  onSubmit(){ 
    let userCredentials = new LoginCredentials();
    userCredentials.email = this.email;
    userCredentials.password = this.password;

    /*this.authService.login(userCredentials)
      .subscribe(response => {
        if(this.authService.token) {
          let linkTypeUser = "";

          if(this.authService.userDetails['userTypeId'] == 1) {
            linkTypeUser = "/student";
 
          }else if(this.authService.userDetails['userTypeId'] == 2) {
            linkTypeUser = "/administrator";
          }

          let redirect = this.authService.redirecUrl ? this.router.parseUrl(this.authService.redirecUrl) : linkTypeUser;
          this.router.navigateByUrl(redirect);  
        }
       

      }, error=>console.log(error));*/
  }
  
  ngOnInit(): void {
  }

}
