import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/general-service.service';

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.page.html',
  styleUrls: ['./create-pin.page.scss'],
})
export class CreatePinPage implements OnInit {
  convertedPin;

  private createPasscodeValues: number[] = [];

  constructor( private generalService: GeneralServiceService) {}

  ngOnInit() {
  }

  addNumber(num: number): void {
    if (this.createPasscodeValues.length !== 4) {
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        document.getElementById(`circles${i}`).classList.add('test');
      }
      if (this.createPasscodeValues.length === 4) {
        this.convertedPin = this.createPasscodeValues
          .toString()
          .replace(/,/g, ''); //convert to string then remove the commas
        // sessionStorage.setItem('pin', this.convertedPin); //should be reviewed;
        this.generalService.setCreatedPin(this.convertedPin); //set newly created pin
      }
    }
  }

  removeNumber() {
    this.createPasscodeValues.pop();
    for (let i = this.createPasscodeValues.length; i >= 0; i++) {
      document.getElementById(`circles${i}`).classList.remove('test');
      break;
    }
  }
}
