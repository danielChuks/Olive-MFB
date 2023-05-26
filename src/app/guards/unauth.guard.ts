import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  userAuthStringData;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly USER_AUTH_KEY = '@USER_AUTH_KEY';

  constructor( private router: Router,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private auth: AuthService
) { }

  canActivate(
    route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): boolean {
              if (this.auth.isLoggedIn()){
                return true;
              } else {
              this.router.navigate(['/']);
              return false;
                }
              }

      canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
          if (sessionStorage.getItem(this.USER_AUTH_KEY) === this.userAuthStringData)
          // eslint-disable-next-line curly
          return true;
        else {
          this.router.navigate(['/new-tab/hometab']);
          return false;
            }
          }

          canLoad(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): boolean {
              if (this.auth.isLoggedIn())
              // eslint-disable-next-line curly
              return true;
            else {
              this.router.navigate(['/new-tab/hometab']);
              return false;
                }
              }
}
