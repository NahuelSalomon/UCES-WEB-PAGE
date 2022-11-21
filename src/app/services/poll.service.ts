import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private urlAPI = "http://localhost:8080/api/poll";

  constructor(private http: HttpClient) { }

  getByCareerId(careerId: number) : Promise<any> {
    return this.http.get(this.urlAPI +'/career/' + careerId).toPromise();
  }


  getBySubjectId(subjectId: number) : Promise<any> {
    return this.http.get( `${this.urlAPI}/subject/${subjectId}`).toPromise();
  }

}
