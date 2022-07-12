import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  
  private urlAPI = "http://localhost:8080/api/boards";

  constructor(private http : HttpClient) { }

  add(board : Board) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI, board, httpOptions).toPromise(); 
  }

  getAll() : Promise<any> {
    return this.http.get(this.urlAPI).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + "/" +id).toPromise();
  }

  getBySubject(idSubject: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/subjects/${idSubject}`).toPromise();
  }

  delete(id: number) : Promise<any> {
   return this.http.delete(this.urlAPI + "/" + id).toPromise();
  }

  update(id : number, board : Board) : Promise<any> {

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.put(this.urlAPI + "/" + id, board, httpOptions).toPromise(); 
  }
}
