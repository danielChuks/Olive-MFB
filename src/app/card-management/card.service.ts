import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HotlistModel } from './hotlist';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCardDetails(accountNumber): Observable<any>{
    return this.http.get(`${environment.baseApi + 'cards' + '/all' + `/${accountNumber}`}`);
  }

  hotlistCard(details: HotlistModel): Observable<any>{
    return this.http.post(`${environment.baseApi + 'cards' + '/hotlist'}`, details);
  }
}
