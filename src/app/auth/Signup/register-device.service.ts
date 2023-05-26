import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from './RegisterModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterDeviceService {
  constructor(private http: HttpClient) {}
  // eslint-disable-next-line @typescript-eslint/naming-convention
  RegisterDevice(register: RegisterModel): Observable<any> {
    return this.http.post(`${environment.baseApi + 'register'}`, register);
  }
}
