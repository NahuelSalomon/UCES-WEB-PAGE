import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

//No esta activado

export class AdministratorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      let typeUser = this.authService.typeUser;

      if(typeUser == "ADMINISTRATOR"){
        return true;
      }
      if(typeUser == undefined){
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
      }
      return false;
  }
  
}
