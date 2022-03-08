import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token: string = undefined;
  typeUser: any = undefined;
  loginUrl = "http://localhost:8080/api/login/";
  userDetailsUrl = "http://localhost:8080/api/login/userDetails";
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(loginCredentials: LoginCredentials): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const promise = this.http.post(this.loginUrl, loginCredentials, httpOptions)
    .toPromise();

    promise
      .then(resp => {
        let obj : {[index: string]:any};
        obj = resp;
        this.token = obj['token'];

        const headerAuth = {
          headers: new HttpHeaders({
            'authorization': `Bearer ${this.token}`
          })
        };
        this.http.get(this.userDetailsUrl, headerAuth).toPromise()
        .then(resp => {

          let userDetails: any = resp;
          this.typeUser = userDetails['typeUser'];
          sessionStorage.setItem('typeUser', userDetails['typeUser']);
        })
        .catch(err => console.log(err));

        sessionStorage.setItem('token', this.token);
      })
      .catch(error => console.log(error));
    
    return promise;
  }

  logout(): void{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('typeUser');
    this.token = undefined;
    this.typeUser = undefined;
  }
}
