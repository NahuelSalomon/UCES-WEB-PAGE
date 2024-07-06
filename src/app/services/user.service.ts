import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private urlAPI = environment.baseUrl + "/api/users"

  constructor(private http : HttpClient) { }

  getAll(token : string) : Promise<any> {

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };

    return this.http.get(this.urlAPI + "/", httpOptions).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + "/" +id).toPromise();
  }

  getByEmail(email: string) : Promise<any> {
    return this.http.get(this.urlAPI + "/email/" +email).toPromise();
  }

  update(user : User, token: string) : Promise<any> {
  
    const headerAuth = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    };
  
    const updateedUser = {
      image: user.image 
    };

   return this.http.put(`${this.urlAPI}/${user.id}`, updateedUser , headerAuth).toPromise(); 
  }

  confirmMail(id: number, token: string)
  {
    const headerAuth = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    };

    return this.http.put(this.urlAPI + "/"+ id + "/confirmEmail",null,headerAuth).toPromise();
  }

  resetPassword(id: number, password: string, token: string)
  {
    const headerAuth = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    };

    return this.http.put(this.urlAPI + "/"+ id + "/password/"+password,null,headerAuth).toPromise();
  }

  votedUnVoteForum(idUser : number, idForum : number, token : string)
  {

    var url = `${this.urlAPI}/${idUser}/forumsVoted/${idForum}`;
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };
    
    return this.http.put(url,httpOptions).toPromise();
  }

  changeState(idUser : number, token : string)
  {
    var url = `${this.urlAPI}/${idUser}/changeState`;
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };
    
    return this.http.put(url,httpOptions).toPromise();
  }

}
