import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlAPI = "http://localhost:8080/api"

  constructor(private http : HttpClient) { }

  sayHello() : Promise<any> {
    return this.http.get(`${this.urlAPI}/user/sayHello`, {responseType: 'text'}).toPromise();
  }

}
