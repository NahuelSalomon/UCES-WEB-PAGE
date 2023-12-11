import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poll } from '../models/poll';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private urlAPI = "http://localhost:8080/api/poll";

  constructor(private http: HttpClient) { }

  add(poll : Poll) : Promise<any> {
  
    const httpOptions = {
     headers : new HttpHeaders({
       'Content-Type' : 'application/json'
     })
   };
   return this.http.post(this.urlAPI + "/", poll, httpOptions).toPromise(); 
  }

  getByCareerId(careerId: number) : Promise<any> {
    return this.http.get(this.urlAPI +'/career/' + careerId).toPromise();
  }


  getBySubjectId(subjectId: number) : Promise<any> {
    return this.http.get( `${this.urlAPI}/subject/${subjectId}`).toPromise();
  }

  getById(pollId : number): Promise<any> 
  {
    return this.http.get( `${this.urlAPI}/${pollId}`).toPromise();
  }

  getAll(): Promise<any> 
  {
    return this.http.get( `${this.urlAPI}/`).toPromise();
  }

  delete(id : number): Promise<any>
  {
    return this.http.delete(this.urlAPI + "/" + id).toPromise();
  }

}
