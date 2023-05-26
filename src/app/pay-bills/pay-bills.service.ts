import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { billsPaymentModel } from './billsPaymentModel';

@Injectable({
  providedIn: 'root'
})


export class PayBillsService {

  constructor(private http: HttpClient) {}

getCategories(): Observable<any>{
  return this.http.get(`${environment.baseApi + `quickteller` + `/billerCategories`}`);
}

  getBillers(id): Observable<any>{
     return this.http.get(`${environment.baseApi + `quickteller` + `/billerByCategories` + `/${id}`}`);
  }

  getProducts(id): Observable<any>{
     return this.http.get(`${environment.baseApi + `quickteller` + `/billerPaymentItems` + `/${id}`}`);
  }

  payBills(paymentDetails: billsPaymentModel): Observable<any>{
    return this.http.post(`${environment.baseApi + `billsPayment`}`, paymentDetails);
  }
}
