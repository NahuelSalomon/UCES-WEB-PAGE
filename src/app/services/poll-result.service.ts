import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollResult } from '../models/poll-result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollResultService {

  private urlAPI = environment.baseUrl + "/api/poll_results/";

  constructor(private http : HttpClient) { }

  add(pollResult : PollResult, token : string) : Promise<any> {
  
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };
    return this.http.post(this.urlAPI, pollResult, httpOptions).toPromise(); 
   }
  

  getByPollAndUser(pollId: number, userId: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}polls/${pollId}/users/${userId}`).toPromise();
  }

}
