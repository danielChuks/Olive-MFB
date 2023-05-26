import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from './LoginModel';
import { UnlinkModel } from './UnlinkModel';
import { environment } from 'src/environments/environment';
import { Headers } from './LoginModel';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  login = new Headers();

  private token: string;

  constructor(private http: HttpClient, private route: Router) {}

  loginWithDetails(login: LoginModel): Observable<any> {
    return this.http
      .post(`${environment.baseApi}` + 'login', login, {
        headers: new HttpHeaders({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization:
            'Basic ' + btoa(login.accountNumber + ':' + login.password),
        }),
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          this.token = response.headers.get('Authorization');
          sessionStorage.setItem('Authorization', this.token);
        })
      );
  }

  ulinkDeviceId(unlinkId: UnlinkModel): Observable<any> {
    return this.http.post(
      `${environment.baseApi + 'account' + `/unlinkDevice`}`,
      unlinkId
    );
  }

  callCookie(): Observable<any> {
    return this.http.get(`${environment.baseApi + 'getcookie'}`);
  }

  logout() {
    sessionStorage.removeItem('accountNumber');
    this.route.navigate(['/login-screen']);
  }
}
