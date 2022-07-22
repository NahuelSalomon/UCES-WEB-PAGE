import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private urlAPI = "http://localhost:8080/api/users"

  constructor(private http : HttpClient) { }

  sayHello() : Promise<any> {
    return this.http.get(`${this.urlAPI}/user/sayHello`, {responseType: 'text'}).toPromise();
  }

  add(user : User) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
  
   return this.http.post(this.urlAPI, user, httpOptions).toPromise(); 
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

 delete(id: number) : Promise<any> {
   return this.http.delete(this.urlAPI + "/" + id).toPromise();
 }

}
