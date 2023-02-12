import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollUser } from '../models/poll-user';

@Injectable({
  providedIn: 'root'
})
export class PollUserService {

  private urlAPI = "http://localhost:8080/api/pollUser/";

  constructor(private http : HttpClient) { }

  add(pollUser : PollUser) : Promise<any> {
  
   const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI, pollUser, httpOptions).toPromise(); 
  }

  getAll(size = 10, page= 0) : Promise<any> {
    return this.http.get(`${this.urlAPI}?page=${page}&size=${size}`).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI +id).toPromise();
  }

  getByPollAndUser(idPoll : number, idUser : number) : Promise<any>
  {
    return this.http.get(`${this.urlAPI}poll/${idPoll}/user/${idUser}`).toPromise();
  }

  delete(id: number) : Promise<any> {
    return this.http.delete(this.urlAPI + id).toPromise();
   }


}
