import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getBalanceEnquiry(): Observable<any>{
    return  this.http.get(`${environment.baseApi + 'balance' + `/${JSON.parse(sessionStorage.getItem('accountNumber'))}`}`);

  }

  getName(accountNo: any): Observable<any>{
    return  this.http.get(`${environment.baseApi}` + 'account' + '/name' + `/${accountNo}`);
  }

  getExternalAccountName(bankCode, accountId):  Observable<any> {
 // eslint-disable-next-line max-len
 return  this.http.get(`${environment.baseApi}` + 'quickteller' + '/nameenquiry' + `/${bankCode}` + `/${accountId}`);
  }

  getProfileName(): Observable<any>{
    return this.http.get(`${environment.baseApi}` + `account` + `/name` + `/${sessionStorage.getItem('accountNumber')}`);
  }

  getTransactionHistory(): Observable<any>{
   return this.http.get(`${environment.baseApi}` + `account` + `/history` + `/${sessionStorage.getItem('currentAcctNumber')}`);
  }

  getTransactionHistoryOnInit(): Observable<any>{
     return this.http.get(`${environment.baseApi}` + `account` + `/history` + `/${sessionStorage.getItem('accountNumber')}`);
  }

  getMultipleAccounts(): Observable<any>{
  return this.http.get(`${environment.baseApi}` + `account` + `/allAccounts` + `/${sessionStorage.getItem('accountNumber')}` );
   }
}
