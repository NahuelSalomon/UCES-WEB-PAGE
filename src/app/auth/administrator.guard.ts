import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResolverAdministratorGuardService } from '../services/auth-resolver-administrator-guard.service';

@Injectable({
  providedIn: 'root'
})

//No esta activado

export class AdministratorGuard implements CanActivate {
  constructor(private authResolverService : AuthResolverAdministratorGuardService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authResolverService.resolve(route,state);
  }
  
}
