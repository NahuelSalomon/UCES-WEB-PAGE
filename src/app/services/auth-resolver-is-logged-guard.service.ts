import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthResolverIsLoggedGuardService implements Resolve<boolean | UrlTree>{

  constructor(private authService: AuthService,private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const storedToken = sessionStorage.getItem('token');

    return storedToken ? this.authService.getUserDetails(storedToken).then(response => {
      if (response) {
        return true;
      } else {
        this.authService.redirectUrl = state.url;
        return this.router.navigate(['/login']);;
      }
    }) : null;
  }


}
