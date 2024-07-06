import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../models/board';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  
  private urlAPI = environment.baseUrl + "/api/boards";

  constructor(private http : HttpClient) { }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + "/" +id).toPromise();
  }

  getBySubject(idSubject: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}/subjects/${idSubject}`).toPromise();
  }


}
