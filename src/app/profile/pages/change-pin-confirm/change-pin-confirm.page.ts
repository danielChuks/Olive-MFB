import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { changePinModel } from '../ChangePinModel';
import { Subscription } from 'rxjs';
import { GeneralServiceService } from 'src/app/general-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-change-pin-confirm',
  templateUrl: './change-pin-confirm.page.html',
  styleUrls: ['./change-pin-confirm.page.scss'],
})
export class ChangePinConfirmPage implements OnInit, OnDestroy {
  pinValidationDetails = new changePinModel();
  oldPin;
  initialCreatedPin; //pin set in the first page
  convertedPin;
  private createPasscodeValues: number[] = [];
  private httpSubscription: Subscription;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private generalService: GeneralServiceService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.generalService.setOldPin.subscribe((oldPin) => (this.oldPin = oldPin)); //get old pin
    this.generalService.setNewPin.subscribe(
      (newPin) => (this.initialCreatedPin = newPin)
    ); // get new pin
  }

  async addNumber(num: number) {
    if (this.createPasscodeValues.length !== 4) {
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        const iconElement = document.createElement('ion-icon');
        iconElement.setAttribute('name', 'medical-sharp');
        const circleElement = document.getElementById(`circlesss${i}`);
        circleElement.innerHTML = '';
        circleElement.appendChild(iconElement);
      }
      if (this.createPasscodeValues.length === 4) {
        const loading = await this.loadingCtrl.create({
          message: '',
          cssClass: 'custom-loading',
        });
        loading.present();

        this.convertedPin = this.createPasscodeValues
          .toString()
          .replace(/,/g, ''); //convert to string then remove the commas
        this.pinValidationDetails.oldAccessPin = this.oldPin; //initialize pin to pin object
        this.pinValidationDetails.accountNumber =
          sessionStorage.getItem('accountNumber'); //initialize account number
        this.pinValidationDetails.newAccessPin = this.convertedPin;
        if (this.initialCreatedPin === this.convertedPin) {
          loading.dismiss();
          this.generalService.setPinChangeData(this.pinValidationDetails); //set data to be used for http request
          this.router.navigate(['/verification'], { queryParams: { action: 'changePin' } });
        } else {
          loading.dismiss();
          this.presentAlert('PINS do not match');
        }
      }
    }
  }

  removeNumber() {
    //coming back bug, the state doeant't change
    this.createPasscodeValues.pop();
      for (let i = this.createPasscodeValues.length; i >= 0; i--) {
        const circleElement = document.getElementById(`circlesss${i}`);
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

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
    // if (this.createPasscodeValues.length > 0) {
    //    for (let i = 0; i <= this.createPasscodeValues.length ; i++) {
    //      const circleElement = document.getElementById(`circlesss${i}`);
    //      console.log(circleElement);
    //      circleElement.innerHTML = ''
    // }
    // }
  }
}
