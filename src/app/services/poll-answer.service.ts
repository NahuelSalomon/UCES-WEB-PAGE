import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollAnswer } from '../models/poll-answer';

@Injectable({
  providedIn: 'root'
})
export class PollAnswerService {


  private urlAPI = "http://localhost:8080/api/pollAnswer/";

  constructor(private http : HttpClient) { }

  add(pollAnswer : PollAnswer) : Promise<any> {
  
   const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI, pollAnswer, httpOptions).toPromise(); 
  }

  addAll(pollAnswerList : Array<PollAnswer>) : Promise<any> {
  
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };

    return this.http.post(`${this.urlAPI}all`, pollAnswerList, httpOptions).toPromise(); 
   }

  getAll(size = 10, page= 0) : Promise<any> {
    return this.http.get(`${this.urlAPI}?page=${page}&size=${size}`).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI +id).toPromise();
  }

  delete(id: number) : Promise<any> {
    return this.http.delete(this.urlAPI + id).toPromise();
   }

   update(id : number, pollAnswer : PollAnswer) : Promise<any> {

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.put(this.urlAPI + id, pollAnswer, httpOptions).toPromise(); 
    }
}
