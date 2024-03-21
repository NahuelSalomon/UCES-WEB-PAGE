import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  
  private urlAPI = "http://localhost:8080/api/boards";

  constructor(private http : HttpClient) { }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + "/" +id).toPromise();
  }

  getBySubject(idSubject: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/subjects/${idSubject}`).toPromise();
  }


}
