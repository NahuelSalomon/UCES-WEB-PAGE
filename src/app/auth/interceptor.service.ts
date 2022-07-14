import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/* Este interceptor no está activado todavía porque la API no pide token para 
acceder a los endpoints */

export class InterceptorService implements HttpInterceptor{
  [x: string]: any;

  constructor(private route : Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');

    let request = req;

    if (token){
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      })
      console.log("Hay token")
      console.log(token)
      console.log(sessionStorage.getItem('userType'))
    }else{
      console.log("NO TOKEEN")
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if(err.status === 401){
          this.router.navigateByUrl('/login');
        }
        else if (err.status === 403){
          this.router.navigateByUrl("/login");
        }

        return throwError(err);
      })
    );
  }
}
