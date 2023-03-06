import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor( private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser =  localStorage.getItem("userName");
      if (currentUser) {
          return true;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
     
    }
  }






