import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly USER_AUTH_KEY = '@USER_AUTH_KEY';

  constructor( private router: Router,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                private auth: AuthService
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (sessionStorage.getItem(this.USER_AUTH_KEY) != null)
      // eslint-disable-next-line curly
      return true;
    else {
      this.router.navigate(['/']);
      return false;
        }
      }

      canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
          if (sessionStorage.getItem(this.USER_AUTH_KEY) != null)
          // eslint-disable-next-line curly
          return true;
        else {
          this.router.navigate(['/']);
          return false;
            }
          }

      canLoad(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
          if (sessionStorage.getItem(this.USER_AUTH_KEY) != null)
          // eslint-disable-next-line curly
          return true;
        else {
          this.router.navigate(['/']);
          return false;
            }
          }
  }
