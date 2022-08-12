import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private urlAPI = "http://localhost:8080/api/subjects/";

  constructor(private http : HttpClient) { }

  add(subject : Subject) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI, subject, httpOptions).toPromise(); 
  }

  getAll(size = 10, page= 0) : Promise<any> {
    return this.http.get(`${this.urlAPI}?size=${size}&page=${page}`).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + id).toPromise();
  }

  getByCareer(idCareer: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}careers/${idCareer}`).toPromise();
  }

  delete(id: number) : Promise<any> {
   return this.http.delete(this.urlAPI + id).toPromise();
  }

  getCorrelativesById(id: number): Promise<any> {
    return this.http.get(`${this.urlAPI}${id}/correlatives`).toPromise();
  }

}
