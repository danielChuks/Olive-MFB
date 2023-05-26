import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class PinService {
  private subject = new Subject<any>();

    constructor( private router: Router){}

      signup() {
        this.subject.next();
      }

      transfer(): Observable<any> {
        return this.subject.asObservable();
      }
}
