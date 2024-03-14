/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BeneficiaryModel } from './beneficiaryModel';
// import { BehaviorSubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeneficiariesService {
  beneficiariesList: any[] = [];
  test: any;

  private initialAcctNo = new Subject<string>();

  constructor(private http: HttpClient) {}

  setAccountNo(message: string) {
    this.initialAcctNo.next(message);
  }

  getAccountNo() {
    return this.initialAcctNo.asObservable();
  }

  addBeneficiary(beneficiary: BeneficiaryModel): Observable<any> {
    return this.http.post(
      `${environment.baseApi + `account` + `/beneficiary`}`,
      beneficiary
    );
  }

  getBeneficiaryList(): Observable<any> {
    return this.http.get(
      `${
        environment.baseApi +
        `account` +
        `/beneficiary` +
        `/${sessionStorage.getItem('accountNumber')}`
      }`
    );
  }

  getInternalBeneficiaryList(): Observable<any> {
    return this.http.get(
      `${
        environment.baseApi +
        `account` +
        `/beneficiary` +
        `/${sessionStorage.getItem('accountNumber')}`
      }` + `?isLocal=y`
    );
  }

  getExternalBeneficiaryList(): Observable<any> {
    return this.http.get(
      `${
        environment.baseApi +
        `account` +
        `/beneficiary` +
        `/${sessionStorage.getItem('accountNumber')}`
      }` + `?isLocal=n`
    );
  }

  deleteBeneficiary(): Observable<any> {
    return this.http.delete(
      `${
        environment.baseApi +
        `account` +
        `/beneficiary` +
        `/${JSON.parse(sessionStorage.getItem('beneficiaryId'))}`
      }`
    );
  }

  getListofBanks(): Observable<any> {
    return this.http.get(
      `${environment.baseApi + `quickteller` + `/bankcodes`}`
    );
  }
  getNipListofBanks(): Observable<any>{
    return this.http.get(`${environment.baseApi}nip/bankcodes`);
      }
  getInterswitchBanks():  Observable<any>{
    return this.http.get(`${environment.baseApi}quickteller/bankcodes`);
   }
}
