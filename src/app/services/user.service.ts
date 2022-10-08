import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private urlAPI = "http://localhost:8080/api/users"

  constructor(private http : HttpClient) { }

  add(user : User) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
  
   return this.http.post(this.urlAPI, user, httpOptions).toPromise(); 
  }

  update(user : User, token: string) : Promise<any> {
  
    const headerAuth = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    };
  
   return this.http.put(`${this.urlAPI}/${user.id}`, user, headerAuth).toPromise(); 
  }


  getAll() : Promise<any> {
    return this.http.get(this.urlAPI + "/").toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + "/" +id).toPromise();
  }

  getByEmail(email: string) : Promise<any> {
    return this.http.get(this.urlAPI + "/email/" +email).toPromise();
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

  resetPassword(id: number, password: string,token: string)
  {
    const headerAuth = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    };

    return this.http.put(this.urlAPI + "/"+ id + "/password/"+password,null,headerAuth).toPromise();
  }

  delete(id: number) : Promise<any> {
    return this.http.delete(this.urlAPI + "/" + id).toPromise();
  }

  votedUnVoteForum(idUser : number, idForum : number)
  {

    var url = `${this.urlAPI}/${idUser}/forumsVoted/${idForum}`;
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    
    return this.http.put(url,httpOptions).toPromise();
  }

}
