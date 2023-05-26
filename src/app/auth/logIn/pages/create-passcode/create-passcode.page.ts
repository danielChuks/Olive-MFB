import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-passcode',
  templateUrl: './create-passcode.page.html',
  styleUrls: ['./create-passcode.page.scss'],
})
export class CreatePasscodePage implements OnInit {

  private createPasscodeValues: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  addNumber(num: number): void {
    if (this.createPasscodeValues.length !== 6) {
      this.createPasscodeValues.push(num);
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  removeNumber() {
    this.createPasscodeValues.pop();
  }



}
