import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginCredentials } from '../models/login-credentials';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token : string;
  userTypeListener = new Subject<string>();
  userType: string;
  loginUrl = "http://localhost:8080/api/auth/login";
  registerUrl = "http://localhost:8080/api/auth/register";
  userDetailsUrl = "http://localhost:8080/api/auth/userDetails";
  redirectUrl: string;
  idUser: number;

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
          this.userTypeListener.next(userDetails['userType']);
          this.userType = userDetails['userType'];
          this.idUser = userDetails['id'];
          sessionStorage.setItem('userType', userDetails['userType']);
        })
        .catch(err => console.log(err));

        sessionStorage.setItem('token', this.token);
      })
      .catch(error => console.log(error));
    return promise;
  }

  register(user: User): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.registerUrl, user, httpOptions).toPromise();
  }

  logout(): void{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userType');
    this.token = undefined;
    this.userTypeListener.next(null);
    this.userType = undefined;
  }

  getAuthStatuesListener() {
    return this.userTypeListener.asObservable();
  }
}
