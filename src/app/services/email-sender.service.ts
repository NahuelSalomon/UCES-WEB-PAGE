import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendEmailConfirmEmailRequest } from '../models/send-email-confirm-email-request';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  private urlAPI = "http://localhost:8080/api/sendEmail";

  constructor(private http : HttpClient) { }

  confirmEmail(sendEmailConfirmEmailRequest : SendEmailConfirmEmailRequest) : Promise<any> {

   return this.http.post(`${this.urlAPI}/confirmEmail`, sendEmailConfirmEmailRequest).toPromise(); 
  }

}
