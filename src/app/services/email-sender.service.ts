import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendEmailRequest } from '../models/send-email-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  private urlAPI = environment.baseUrl + "/api/sendEmail";

  constructor(private http : HttpClient) { }

  confirmEmail(sendEmailRequest : SendEmailRequest) : Promise<any> {

   return this.http.post(`${this.urlAPI}/confirmEmail`, sendEmailRequest).toPromise(); 
  }

  resetPassword(sendEmailRequest : SendEmailRequest) : Promise<any> {

    return this.http.post(`${this.urlAPI}/resetPassword`, sendEmailRequest).toPromise(); 
   }

}
