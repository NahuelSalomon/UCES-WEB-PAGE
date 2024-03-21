import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollQuestion } from '../models/poll-question';

@Injectable({
  providedIn: 'root'
})
export class PollQuestionService {

  private urlAPI = "http://localhost:8080/api/poll_question/";

  constructor(private http : HttpClient) { }

  add(pollQuestion : PollQuestion, token: string) : Promise<any> {
  
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };
    return this.http.post(this.urlAPI, pollQuestion, httpOptions).toPromise(); 
   }

   addAll(pollQuestionList : Array<PollQuestion>, token: string) : Promise<any> {
   
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };

    return this.http.post(`${this.urlAPI}all`, pollQuestionList, httpOptions).toPromise(); 
   }

  getAllByPoll(id : number) : Promise<any>
  {
    return this.http.get(`${this.urlAPI}polls/${id}`).toPromise();
  }

  delete(id : number, token: string): Promise<any>
  {

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };

    return this.http.delete(this.urlAPI +id, httpOptions).toPromise();
  }

}
