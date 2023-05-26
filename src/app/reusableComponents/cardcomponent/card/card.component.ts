import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() accountBalance: string;
  @Input() accountNumber: string;
  isdisplay: boolean;

  constructor() {}

  hideBalance() {
    this.isdisplay = !this.isdisplay;
  }

  ngOnInit() {}
}
