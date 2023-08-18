import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {


  constructor(private http: HttpClient) {
  }

  handleCreateAccount(data: any): Observable<any>{
    return this.http.post(`${environment.baseApi}customers/create`, data);
  }
}
