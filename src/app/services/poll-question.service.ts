import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollQuestion } from '../models/poll-question';

@Injectable({
  providedIn: 'root'
})
export class PollQuestionService {

  private urlAPI = "http://localhost:8080/api/poll_question/";

  constructor(private http : HttpClient) { }

  add(pollQuestion : PollQuestion) : Promise<any> {
  
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.urlAPI, pollQuestion, httpOptions).toPromise(); 
   }

   addAll(pollQuestionList : Array<PollQuestion>) : Promise<any> {
   
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      }) 
    };
    return this.http.post(`${this.urlAPI}all`, pollQuestionList, httpOptions).toPromise(); 
   }

   getAll(size = 10, page= 0) : Promise<any> {
    return this.http.get(`${this.urlAPI}?page=${page}&size=${size}`).toPromise();
    }
  
  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI +id).toPromise();
  }

  getAllByPoll(id : number) : Promise<any>
  {
    return this.http.get(`${this.urlAPI}polls/${id}`).toPromise();
  }

  delete(id : number): Promise<any>
  {
    return this.http.delete(this.urlAPI +id).toPromise();
  }

}
