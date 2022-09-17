import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryResponse } from '../models/query-response';

@Injectable({
  providedIn: 'root'
})
export class ResponseQueryService {

  private urlAPI = "http://localhost:8080/api/query/responses/";

  constructor(private http : HttpClient) { }

  add (resp : QueryResponse) : Promise<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(this.urlAPI, resp, httpOptions).toPromise();
  }

  delete(id : number) : Promise<any>{
    return this.http.delete(this.urlAPI).toPromise();
  }

}
