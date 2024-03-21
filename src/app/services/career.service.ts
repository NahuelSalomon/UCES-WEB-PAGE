import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Career } from '../models/career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private urlAPI = "http://localhost:8080/api/careers/";

  constructor(private http : HttpClient) { }

  add(career : Career, token: string) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json',
       'authorization': `Bearer ${token}`
     })
   };

   return this.http.post(this.urlAPI, career, httpOptions).toPromise(); 
  }

  getAll() : Promise<any> {
    return this.http.get(this.urlAPI).toPromise();
  }

  getById(id: number) : Promise<any> {
    return this.http.get(this.urlAPI +id).toPromise();
  }

  getByName(name: string) : Promise<any> {
    return this.http.get(this.urlAPI + 'search?name=' + name).toPromise();
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
