import { Injectable, NgZone } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginModel } from '../auth/logIn/LoginModel';
import { map } from 'rxjs/operators';
import { LoginResponse } from '../common/login-response';
import { User } from '../data/user';
import { UserLoginData } from '../data/user-login';
// import { Idle, DEFAULT_INTERRUPTSOURCES } from 'idle/core';
import { HTMLIonOverlayElement } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly $user = new BehaviorSubject<User>(null);
  private readonly $isAuthenticated = new BehaviorSubject<boolean>(false);
  private readonly $token = new BehaviorSubject<string>(null);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly USER_AUTH_KEY = '@USER_AUTH_KEY';
  private httpWithoutInterceptor: HttpClient;

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
    private router: Router,
    private readonly ngZone: NgZone
  ) {
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
  }

  get isAuthenticated() {
    return this.$isAuthenticated.asObservable();
  }

  get token() {
    return this.$token.asObservable();
  }

  login(login: LoginModel): Observable<any> {
    return this.httpWithoutInterceptor
      .post<LoginResponse>(`${environment.baseApi + 'login'}`, login)
      .pipe(
        map(
          (response) => {
            this.$user.next(response.accountNumber);
            this.$isAuthenticated.next(true);
            const userAuthData: UserLoginData = {
              accountNumber: response.accountNumber,
            };
            const userAuthStringData = JSON.stringify(userAuthData);
            sessionStorage.setItem(this.USER_AUTH_KEY, userAuthStringData);
            return true;
          },
          async (err) => {
            this.$user.next(null);
            this.$isAuthenticated.next(false);
            this.$token.next(null);
            return false;
          }
        )
      );
  }

  //check if user is loggedin
  isLoggedIn() {
    return sessionStorage.getItem(this.USER_AUTH_KEY);
  }

  logout() {
    sessionStorage.removeItem(this.USER_AUTH_KEY);
    this.closeAll();
    this.router.navigate(['/login-screen'], {
      replaceUrl: true,
      state: { reinitialize: true },
    });
  }
  closeAll = () => {
    // adjust selector to fit your needs
    const overlays = document.querySelectorAll(
      'ion-alert, ion-action-sheet, ion-loading, ion-modal, ion-picker, ion-popover, ion-toast'
    );
    const overlaysArr = Array.from(overlays) as HTMLIonOverlayElement[];
    overlaysArr.forEach((o) => o.dismiss());
  };
}
