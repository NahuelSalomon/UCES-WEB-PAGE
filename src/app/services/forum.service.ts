import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forum } from '../models/forum';
import { Query } from '../models/query';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private urlAPI = environment.baseUrl + "/api/forums";

  constructor(private http : HttpClient) { }

  add(forum : Forum, token: string) : Promise<any> {
  
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };

    return this.http.post(this.urlAPI, forum, httpOptions).toPromise(); 
  }

  getAllQueriesByBoard(idBoard: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/queries/boards/${idBoard}`).toPromise();
  }

  getAllQueriesByBoardSortedByVotes(idBoard: number, page: number, size: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/queries/boards/${idBoard}/sort/votes?page=${page}&size=${size}`, {observe: 'response'}).toPromise();
  }

  getAllQueriesByBoardSortedByDate(idBoard: number, page: number, size: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/queries/boards/${idBoard}/sort/date?page=${page}&size=${size}`, {observe: 'response'}).toPromise();
  }

  getAllRecommendationsByBoardSortedByVotes(idBoard: number, page: number, size: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/recommendations/boards/${idBoard}/sort/votes?page=${page}&size=${size}`,{observe: 'response'}).toPromise();
  }

  getAllRecommendationsByBoardSortedByDate(idBoard: number, page: number, size: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/recommendations/boards/${idBoard}/sort/date?page=${page}&size=${size}`,{observe: 'response'}).toPromise();
  }

  getAllRecommendationssByBoard(idBoard: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/recommendations/boards/${idBoard}`).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + "/" +id).toPromise();
  }

  delete(id: number, token: string) : Promise<any> {
    
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };
    
    return this.http.delete(this.urlAPI + "/" + id, httpOptions).toPromise();
  }

}
