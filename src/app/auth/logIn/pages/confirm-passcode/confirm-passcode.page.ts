import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-passcode',
  templateUrl: './confirm-passcode.page.html',
  styleUrls: ['./confirm-passcode.page.scss'],
})
export class ConfirmPasscodePage implements OnInit {
 private confirmPasscodeValues: number[] = [];
  constructor() { }

  ngOnInit() {
  }
  addNumber(num: number): void {
    if (this.confirmPasscodeValues.length !== 6) {
      this.confirmPasscodeValues.push(num);
    }
  }
  removeNumber() {
    this.confirmPasscodeValues.pop();
  }


}
