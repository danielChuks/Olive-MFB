import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/general-service.service';

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.page.html',
  styleUrls: ['./create-pin.page.scss'],
})
export class CreatePinPage implements OnInit {
  convertedPin;

  private createPasscodeValues: number[] = [];

  constructor( private generalService: GeneralServiceService,
    private route: Router) {}

  ngOnInit() {
  }

  addNumber(num: number): void {
    if (this.createPasscodeValues.length !== 4) {
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        const iconElement = document.createElement('ion-icon');
        iconElement.setAttribute('name', 'medical-sharp');
        const circleElement = document.getElementById(`circle${i}`);
        circleElement.innerHTML = '';
        circleElement.appendChild(iconElement);
      }
      if (this.createPasscodeValues.length === 4) {
        this.convertedPin = this.createPasscodeValues
          .toString()
          .replace(/,/g, ''); //convert to string then remove the commas
        // sessionStorage.setItem('pin', this.convertedPin); //should be reviewed;
        this.generalService.setCreatedPin(this.convertedPin); //set newly created pin
        this.route.navigateByUrl('/confirm-pin');

      }
    }
  }

  removeNumber() {
    this.createPasscodeValues.pop();
    for (let i = this.createPasscodeValues.length; i >= 0; i--) {
      const circleElement = document.getElementById(`circle${i}`);
      circleElement.innerHTML = '';
      break;
    }
  }
}
