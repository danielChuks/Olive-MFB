import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GeneralServiceService } from 'src/app/general-service.service';

@Component({
  selector: 'app-change-pin-new',
  templateUrl: './change-pin-new.page.html',
  styleUrls: ['./change-pin-new.page.scss'],
})
export class ChangePinNewPage implements OnInit {
  convertedPin;
  isPinComplete = false;

  private createPasscodeValues: number[] = [];

  constructor(
    private alertController: AlertController,
    private generalService: GeneralServiceService
  ) {}

  ngOnInit() {}

  addNumber(num: number): void {
    if (this.createPasscodeValues.length !== 4) {
      this.isPinComplete = false;
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        const iconElement = document.createElement('ion-icon');
        iconElement.setAttribute('name', 'medical-sharp');
        const circleElement = document.getElementById(`circless${i}`);
        circleElement.innerHTML = '';
        circleElement.appendChild(iconElement);
      }
      if (this.createPasscodeValues.length === 4) {
        this.isPinComplete = true;
        this.convertedPin = this.createPasscodeValues
          .toString()
          .replace(/,/g, ''); //convert to string then remove the commas
        this.generalService.updateNewPin(this.convertedPin);
      }
    }
  }

  removeNumber() {
    this.isPinComplete = false;
    this.createPasscodeValues.pop();
    for (let i = this.createPasscodeValues.length; i >= 0; i--) {
      const circleElement = document.getElementById(`circless${i}`);
      circleElement.innerHTML = '';
      break;
    }
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
