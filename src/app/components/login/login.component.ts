import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginCredentials } from 'src/app/models/login-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

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
    
    this.authService.login(userCredentials)
      .then(response => {
        if(this.authService.token) {

          let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/';

          this.router.navigateByUrl(redirect);

          console.log(response.status);

          /*  if(this.authService.userDetails['userTypeId'] == 1) {
            linkTypeUser = "/student";
 
          }else if(this.authService.userDetails['userTypeId'] == 2) {
            linkTypeUser = "/administrator";
          }

          this.router.navigateByUrl(redirect);   */
        }
       

      }, error=>console.log(error));
  }
  
  ngOnInit(): void {
  }

}
