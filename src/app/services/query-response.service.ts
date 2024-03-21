import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryResponse } from '../models/query-response';

@Injectable({
  providedIn: 'root'
})
export class ResponseQueryService {

  private urlAPI = "http://localhost:8080/api/query/responses/";

  constructor(private http : HttpClient) { }

  add (resp : QueryResponse, token: string) : Promise<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };
    return this.http.post(this.urlAPI, resp, httpOptions).toPromise();
  }

  delete(id : number, token: string) : Promise<any>{
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };
    return this.http.delete(this.urlAPI+id, httpOptions).toPromise();
  }

}
