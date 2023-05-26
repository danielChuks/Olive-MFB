import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InternalTransferModel } from './InternalTransferModel';
import { accessPinModel } from './acessPinModel';
import { ExternalTransferModel } from './ExternalTransferModel';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  internalFundTransfer(transfer: InternalTransferModel): Observable<any>{
    return this.http.post(`${environment.baseApi + 'internalFundTransfer'}`, transfer);
  }

  externalFundTransfer(extTransfer: ExternalTransferModel ): Observable<any>{
    return this.http.post(`${environment.baseApi + 'externalFundTransfer'}`, extTransfer);
  }


  validatePin(accessPin: accessPinModel): Observable<any>{
   return this.http.post(`${environment.baseApi + 'account' + '/accessPin'}`, accessPin);
  }

  getTransactionLimit(): Observable<any>{
    return this.http.get(`${environment.baseApi + `${sessionStorage.getItem('selectedAcct')}` + `/transactionLimit`}`);
  }
}
