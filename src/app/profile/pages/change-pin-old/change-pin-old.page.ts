import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { accessPinModel } from 'src/app/transfer/acessPinModel';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GeneralServiceService } from 'src/app/general-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-change-pin-old',
  templateUrl: './change-pin-old.page.html',
  styleUrls: ['./change-pin-old.page.scss'],
})
export class ChangePinOldPage implements OnInit {
  pinValidationDetails = new accessPinModel();
  convertedPin;

  private createPasscodeValues: number[] = [];

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private alertController: AlertController,
    private generalService: GeneralServiceService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async addNumber(num: number) {
    if (this.createPasscodeValues.length !== 4) {
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        document.getElementById(`circles${i}`).classList.add('test');
      }
      if (this.createPasscodeValues.length === 4) {
        const loading = await this.loadingCtrl.create({
          message: '',
          cssClass: 'custom-loading',
        });
        loading.present();
        this.convertedPin = this.createPasscodeValues
          .toString()
          .replace(/,/g, ''); // convert array values to string
        this.pinValidationDetails.accessPin = this.convertedPin; //initialize pin to pin object
        this.pinValidationDetails.accountNumber =
          sessionStorage.getItem('accountNumber'); //initialize account number
        this.profileService.validatePin(this.pinValidationDetails).subscribe(
          (data) => {
            this.loadingCtrl.dismiss();
            this.generalService.updateOldPin(this.convertedPin); //set old pin
            this.router.navigateByUrl('/change-pin-new');
          },
          (err) => {
            this.loadingCtrl.dismiss();
            this.presentAlert(err.error.message || 'Unable to reach server');
          }
        );
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

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
