import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { confirmPinModel } from './confirmPinModel';
import { validateOtpModel } from './validateOtpModel';
import { changePasswordWithPinModel } from './changePasswordWithPin';
import { forgotPinModel } from './validateOtpModel';


@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  validatePin(details: confirmPinModel): Observable<any>{
   return this.http.post(`${environment.baseApi + 'account' + '/confirmTransactionPin'}`, details);
  }

  requestOtp(accountNum): Observable<any> {
     return this.http.get(`${environment.baseApi}account/otp/${accountNum}`);
  }

  validateOtp(otpDetails: validateOtpModel): Observable<any>{
    return this.http.post(`${environment.baseApi + 'account' + '/otp' + `/validate`}`, otpDetails);
  }

  changePasswordWithTransactionPin(changePasswordDetails: changePasswordWithPinModel): Observable<any> {
    return this.http.post(`${environment.baseApi + 'account' + '/changePasswordWithTransactionPin'}`, changePasswordDetails);
  }

  forgotPin(forgotpinDetails: forgotPinModel): Observable<any> {
    return this.http.post(`${environment.baseApi + `account` + `/forgotPIN`}`, forgotpinDetails);
  }

}
