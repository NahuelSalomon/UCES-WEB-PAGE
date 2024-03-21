import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResolverIsLoggedGuardService } from '../services/auth-resolver-is-logged-guard.service';

@Injectable({
  providedIn: 'root'
})

//No está activado

export class IsLoggedGuard implements CanActivate {
  
  constructor(private authResolverService : AuthResolverIsLoggedGuardService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authResolverService.resolve(route,state);
  }

}
