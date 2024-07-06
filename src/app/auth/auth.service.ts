import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HiddenData } from '../models/hidden-data';
import { LoginCredentials } from '../models/login-credentials';
import { User } from '../models/user';
import { HiddenDataService } from '../services/hidden-data.service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenAttr = undefined;
  userTypeListener = new Subject<string>();
  userType: string;
  loginUrl = environment.baseUrl + "/api/auth/login";
  registerUrl = environment.baseUrl + "/api/auth/register";
  userDetailsUrl = environment.baseUrl + "/api/auth/userDetails";
  redirectUrl: string;
  idUser: number;
  userActive: boolean;
  userConfirmMail: boolean;

  constructor(private http: HttpClient, private hiddenDataService: HiddenDataService, private userService: UserService) {}

  login(loginCredentials: LoginCredentials): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.loginUrl, loginCredentials, httpOptions).toPromise();
  }

  get token() { return !this.tokenAttr ? sessionStorage.getItem('token') : this.tokenAttr ; }
  
  async getUserDetails(token): Promise<any>
  {
    const headerAuth = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    };

    //return this.http.get(this.userDetailsUrl, headerAuth).toPromise();
    return this.http.get(this.userDetailsUrl, headerAuth).toPromise();
  }

  setUserDetails(userDetails : any, token: string)
  {    
      this.userActive = userDetails['active'];
      this.userConfirmMail = userDetails['confirmedEmail'] 
      if(this.userActive && this.userConfirmMail)
      {
        this.userTypeListener.next(userDetails['userType']);
        this.userType = userDetails['userType'];
        this.idUser = userDetails['id'];
        this.tokenAttr = token;
        sessionStorage.setItem('userType', userDetails['userType']);
        sessionStorage.setItem('token', this.token);
      } else
      {
        if(this.userActive && !this.userConfirmMail)
        {
            this.hiddenDataService.receiveData(new HiddenData(
              new User(userDetails['id'],userDetails['firstname'],userDetails['lastname'],userDetails['email'],null,userDetails['userType'],userDetails['active'],userDetails['image']),
              token                                                
            ));         
        }                                     
      }
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
    this.tokenAttr = undefined;
    this.userTypeListener.next(null);
    this.userType = undefined;
  }

  getAuthStatuesListener() {
    return this.userTypeListener.asObservable();
  }
}
