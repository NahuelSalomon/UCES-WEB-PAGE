import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../models/board';
import { CareerStatistics } from '../models/career-statistics';

@Injectable({
  providedIn: 'root'
})
export class CareerStatisticsService {

  private urlAPI = "http://localhost:8080/api/career/statistics/";

  constructor(private http : HttpClient) { }

  add(careerStatistics : CareerStatistics) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI, careerStatistics, httpOptions).toPromise(); 
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

   update(id : number, careerStatistics : CareerStatistics) : Promise<any> {

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.put(this.urlAPI + "/" + id, careerStatistics, httpOptions).toPromise(); 
    }

}
