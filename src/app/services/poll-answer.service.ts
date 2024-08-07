import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollAnswer } from '../models/poll-answer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollAnswerService {
  private urlAPI = environment.baseUrl + "/api/poll_answers/";

  constructor(private http : HttpClient) { }

  addAll(pollAnswerList : Array<PollAnswer>, token: string) : Promise<any> {
  
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };

    return this.http.post(`${this.urlAPI}all`, pollAnswerList, httpOptions).toPromise(); 
   }

}
