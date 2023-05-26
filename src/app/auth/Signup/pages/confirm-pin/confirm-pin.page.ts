import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterDeviceService } from '../../register-device.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-pin',
  templateUrl: './confirm-pin.page.html',
  styleUrls: ['./confirm-pin.page.scss'],
})
export class ConfirmPinPage implements OnInit, OnDestroy {
  message = '';
  pin;
  convertedPin;
  signUpDetails;
  updatedSignupDetails;
  private httpSubscription: Subscription;
  private createPasscodeValues: number[] = [];

  constructor(
    private registerService: RegisterDeviceService,
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.signUpDetails = JSON.parse(sessionStorage.getItem('signUpDetails'));
    this.pin = sessionStorage.getItem('pin');
  }

  async addNumber(num: number) {
    if (this.createPasscodeValues.length !== 4) {
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        document.getElementById(`circless${i}`).classList.add('test');
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
        this.updatedSignupDetails = {
          ...this.signUpDetails,
          accessPin: this.convertedPin,
        };
        if (this.pin === this.convertedPin) {
          this.httpSubscription = this.registerService
            .RegisterDevice(this.updatedSignupDetails)
            .subscribe(
              (data) => {
                loading.dismiss();
                this.router.navigateByUrl('/passcode-set');
              },
              (err) => {
                loading.dismiss();
                this.presentAlert(
                  err.error.message ||
                    err.error.accountNumber ||
                    err.error.accessPin ||
                    err.error.password ||
                    'unable to reach server'
                );
                console.log(err);
              }
            );
        } else {
          loading.dismiss();
          this.presentAlert('pins do not match');
        }
      }
    }
  }

  removeNumber() {
    this.createPasscodeValues.pop();
    for (let i = this.createPasscodeValues.length; i >= 0; i++) {
      document.getElementById(`circless${i}`).classList.remove('test');
      break;
    }
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
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
