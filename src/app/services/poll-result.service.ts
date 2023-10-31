import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollResult } from '../models/poll-result';

@Injectable({
  providedIn: 'root'
})
export class PollResultService {



  private urlAPI = "http://localhost:8080/api/poll_results/";

  constructor(private http : HttpClient) { }

  add(pollQuestion : PollResult) : Promise<any> {
  
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.urlAPI, pollQuestion, httpOptions).toPromise(); 
   }

   getAll(size = 10, page= 0) : Promise<any> {
    return this.http.get(`${this.urlAPI}?page=${page}&size=${size}`).toPromise();
    }
  
  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI +id).toPromise();
  }

  getByPollAndUser(pollId: number, userId: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}polls/${pollId}/users/${userId}`).toPromise();
  }

}
