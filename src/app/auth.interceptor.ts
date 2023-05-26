import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { LoginServiceService } from './auth/logIn/login-service.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginServiceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('Authorization');

    //list of endpoints
    const endpoints = [
      `${environment.baseApi + 'account' + '/confirmTransactionPin'}`,
      `${environment.baseApi}login`,
      `${environment.baseApi}register`,
      `${environment.baseApi}account/otp/validate`,
      `${environment.baseApi}account/changePasswordWithTransactionPin`,
      `${environment.baseApi}account/otp`,
    ];
    if (endpoints.some((endpoint) => request.url.includes(endpoint))) {
      return next.handle(request);
    }
    else {
      request = request.clone({
      headers: request.headers.set('Authorization', `${authToken}`),
      });
    }

    return next.handle(request);
  }
}
