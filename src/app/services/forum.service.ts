import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forum } from '../models/forum';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private urlAPI = "http://localhost:8080/api/forums";

  constructor(private http : HttpClient) { }

  add(forum : Forum) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI, forum, httpOptions).toPromise(); 
  }

  getAll() : Promise<any> {
    return this.http.get(this.urlAPI).toPromise();
  }

  getAllQueriesByBoard(idBoard: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/queries/boards/${idBoard}`).toPromise();
  }

  getAllRecommendationssByBoard(idBoard: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/recommendations/boards/${idBoard}`).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + "/" +id).toPromise();
  }

  delete(id: number) : Promise<any> {
   return this.http.delete(this.urlAPI + "/" + id).toPromise();
  }

  update(id : number, forum : Forum) : Promise<any> {

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.put(this.urlAPI + "/" + id, forum, httpOptions).toPromise(); 
  }

}
