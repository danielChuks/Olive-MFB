import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { accessPinModel } from '../transfer/acessPinModel';
import { changePinModel } from './pages/ChangePinModel';
import { changePasswordModel } from './changePasswordModel';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getAccountInformation(): Observable<any> {
    // eslint-disable-next-line max-len
    return this.http.get(`${environment.baseApi + `account` + `/${JSON.parse(sessionStorage.getItem('accountNumber'))}`}` + '/information');
  }

  validatePin(accessPin: accessPinModel): Observable<any>{
   return this.http.post(`${environment.baseApi + 'account' + '/accessPin'}`, accessPin);
  }

  changeTransactionPin(changePin: changePinModel): Observable<any>{
   return this.http.post(`${environment.baseApi + 'account' + '/changeAccessPin'}`, changePin);
  }

  changePassword(changePassword: changePasswordModel): Observable<any> {
    return this.http.post(`${environment.baseApi + 'account' + '/changePassword'}`, changePassword);
  }
}
