import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollQuestionStatisticService {

  private urlAPI = environment.baseUrl + "/api/poll_question_statistics/";

  constructor(private http : HttpClient) { }

  getAllByPollId(pollId: number) : Promise<any>
  {
    return this.http.get(`${this.urlAPI}polls/${pollId}`).toPromise();  
  }



}
