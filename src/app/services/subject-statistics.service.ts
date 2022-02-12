import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectStatistics } from '../models/subject-statistics';

@Injectable({
  providedIn: 'root'
})
export class SubjectStatisticsService {

  private urlAPI = "http://localhost:8080/api/subject/statistics/";

  constructor(private http : HttpClient) { }

  add(subjectStatistics : SubjectStatistics) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI, subjectStatistics, httpOptions).toPromise(); 
  }

  getAll() : Promise<any> {
    return this.http.get(this.urlAPI).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI + "/" +id).toPromise();
  }

  delete(id: number) : Promise<any> {
    return this.http.delete(this.urlAPI + "/" + id).toPromise();
   }

   update(id : number, subjectStatistics : SubjectStatistics) : Promise<any> {

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.put(this.urlAPI + "/" + id, subjectStatistics, httpOptions).toPromise(); 
    }
}
