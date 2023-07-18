import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.page.html',
  styleUrls: ['./successpage.page.scss'],
})
export class SuccesspagePage implements OnInit {

  username = 'Adewale Charles Ojo';
  accountNumber = '2001123939';
  constructor() { }

  ngOnInit() {
  }

}
