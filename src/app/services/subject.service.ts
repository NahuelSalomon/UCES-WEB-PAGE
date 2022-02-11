import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private urlAPI = "http://localhost:8080/api/subject/";

  constructor(private http : HttpClient) { }

  add(subject : Subject) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI, subject, httpOptions).toPromise(); 
  }

  getAll() : Promise<any> {
    return this.http.get(this.urlAPI).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + id).toPromise();
  }

  delete(id: number) : Promise<any> {
   return this.http.delete(this.urlAPI + id).toPromise();
  }

}
