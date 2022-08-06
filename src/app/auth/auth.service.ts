import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HiddenData } from '../models/hidden-data';
import { LoginCredentials } from '../models/login-credentials';
import { User } from '../models/user';
import { HiddenDataService } from '../services/hidden-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token = undefined;
  userTypeListener = new Subject<string>();
  userType: string;
  loginUrl = "http://localhost:8080/api/auth/login";
  registerUrl = "http://localhost:8080/api/auth/register";
  userDetailsUrl = "http://localhost:8080/api/auth/userDetails";
  redirectUrl: string;
  idUser: number;

  constructor(private http: HttpClient, private hiddenDataService: HiddenDataService) { }


  /*
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

        const headerAuth = {
          headers: new HttpHeaders({
            'authorization': `Bearer ${obj['token']}`
          })
        };

        this.http.get(this.userDetailsUrl, headerAuth).toPromise()
        .then(resp => {
        

          let userDetails: any = resp;
          
          if(userDetails['active'])
          {
            this.userTypeListener.next(userDetails['userType']);
            this.userType = userDetails['userType'];
            this.idUser = userDetails['id'];
            this.token = obj['token'];
            console.log("llegue 0");  
            sessionStorage.setItem('userType', userDetails['userType']);
            sessionStorage.setItem('token', this.token);
          }else
          {
            this.hiddenDataService.receiveData(new HiddenData(
                                                new User(userDetails['id'],userDetails['firstname'],userDetails['lastname'],userDetails['email'],null,userDetails['userType'],userDetails['active']),
                                                obj['token']                                                
                                                ));             
                                                console.log("llegue 1");                                   
          }


        })
        .catch(err => {/*console.log(err)});
        }) 

      .catch(error => { 
        
      });

     
      return promise;
  }*/

  login(loginCredentials: LoginCredentials): Promise<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.loginUrl, loginCredentials, httpOptions).toPromise();
  }
  
  getUserDetails(token): Promise<any>
  {
    const headerAuth = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    };

    return this.http.get(this.userDetailsUrl, headerAuth).toPromise();
  }

  setUserDetails(userDetails : any, token: string)
  {     
      console.log(userDetails);
      
      if(userDetails['active'] && userDetails['confirmedEmail'])
      {
        this.userTypeListener.next(userDetails['userType']);
        this.userType = userDetails['userType'];
        this.idUser = userDetails['id'];
        this.token = token;
        sessionStorage.setItem('userType', userDetails['userType']);
        sessionStorage.setItem('token', this.token);
      } else
      {
        this.hiddenDataService.receiveData(new HiddenData(
                                            new User(userDetails['id'],userDetails['firstname'],userDetails['lastname'],userDetails['email'],null,userDetails['userType'],userDetails['active']),
                                            token                                                
                                            ));             
                                                       
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
    this.token = undefined;
    this.userTypeListener.next(null);
    this.userType = undefined;
  }

  getAuthStatuesListener() {
    return this.userTypeListener.asObservable();
  }
}
