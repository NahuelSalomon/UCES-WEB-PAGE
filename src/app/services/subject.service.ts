import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private urlAPI = "http://localhost:8080/api/subjects/";

  constructor(private http : HttpClient) { }

  add(subject : Subject, token: string) : Promise<any> {
  
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };
   return this.http.post(this.urlAPI, subject, httpOptions).toPromise(); 
  }

  getAll(size = 100, page= 0) : Promise<any> {
    return this.http.get(`${this.urlAPI}?size=${size}&page=${page}`).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + id).toPromise();
  }

  getByNameAndCareerId(name: string, careerId: number, ) : Promise<any> {
    return this.http.get(this.urlAPI + "search?name=" + name + "&idCareer=" + careerId).toPromise();
  }

  getByCareer(idCareer: number) : Promise<any> {
    return this.http.get(`${this.urlAPI}careers/${idCareer}`).toPromise();
  }

  delete(id: number, token: string) : Promise<any> {

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': `Bearer ${token}`
      })
    };

   return this.http.delete(this.urlAPI + id, httpOptions).toPromise();
  }



}
