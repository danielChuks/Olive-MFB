import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AirtimeModel } from './airtimeModel';

@Injectable({
  providedIn: 'root',
})
export class TopUpService {
  constructor(private http: HttpClient) {}

  getBillersList(): Observable<any> {
    return this.http.get(
      `${environment.baseApi + `quickteller` + `/billerByCategories` + `/4`}`
    );
  }

  buyAirtime(details: AirtimeModel): Observable<any> {
    return this.http.post(`${environment.baseApi + 'airtime'}`, details);
  }

  getDataBundles(id: any): Observable<any>{
    return this.http.get(`${environment.baseApi}quickteller/billerPaymentItems/${id}`);
  }
}
