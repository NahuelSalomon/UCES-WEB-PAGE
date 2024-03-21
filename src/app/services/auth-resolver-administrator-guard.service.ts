import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolverAdministratorGuardService implements Resolve<boolean | UrlTree>{

  constructor(private authService: AuthService,private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const storedToken = sessionStorage.getItem('token');

    return storedToken ? this.authService.getUserDetails(storedToken).then(response => {
      if (response) {
        var userDetails = response;

        if(userDetails['userType'] == 'ROLE_ADMINISTRATOR')
        {
          return true;
        }

        return this.router.navigate(['/login']);
      } else {
        this.authService.redirectUrl = state.url;
        return this.router.navigate(['/login']);
      }
    }) : null;
  }

}
