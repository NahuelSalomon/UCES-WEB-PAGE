import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private urlAPI = "http://localhost:8080/api/professor/";

  constructor(private http : HttpClient) { }

  add(professor : Professor) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI, professor, httpOptions).toPromise(); 
  }

  getAll(size = 10, page= 0) : Promise<any> {
    return this.http.get(`${this.urlAPI}?page=${page}&size=${size}`).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI +id).toPromise();
  }

  delete(id: number) : Promise<any> {
    return this.http.delete(this.urlAPI + id).toPromise();
   }

   update(id : number, professor : Professor) : Promise<any> {

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.put(this.urlAPI + "/" + id, professor, httpOptions).toPromise(); 
    }
}
