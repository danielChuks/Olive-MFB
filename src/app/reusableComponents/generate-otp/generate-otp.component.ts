import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ForgotPasswordService } from 'src/app/forgot-password/forgot-password.service';
import { validateOtpModel } from 'src/app/forgot-password/validateOtpModel';
import { GeneralServiceService } from 'src/app/general-service.service';
import { IonModal, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-generate-otp',
  templateUrl: './generate-otp.component.html',
  styleUrls: ['./generate-otp.component.scss'],
})
export class GenerateOtpComponent implements OnInit, OnDestroy {
  convertedPin;
  accountNumber;
  countdownTime = 120; // adjust this value as needed
  disableResendButton = true;
  validateOtp = new validateOtpModel();

  private createPasscodeValues: number[] = [];
  private httpSubscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private forgotPasswordService: ForgotPasswordService,
    private generalService: GeneralServiceService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.startCountdown();
    this.httpSubscriptions.push(
      this.generalService.currentAccountNum.subscribe((msg) => {
        this.accountNumber = msg; //get account number from shared service
      })
    );
  }

  //resend OTP
  resendOtp() {
    this.forgotPasswordService.requestOtp(this.accountNumber).subscribe(
      (data) => {},
      (err) => {
        this.presentAlert('Unable to generate Otp for this Account Number');
      }
    );
    this.countdownTime = 120;
    this.startCountdown();
  }

  startCountdown() {
    this.disableResendButton = true;
    const interval = setInterval(() => {
      this.countdownTime--;
      if (this.countdownTime === 0) {
        clearInterval(interval);
        this.disableResendButton = false; // set to false to enable the button
      }
    }, 1000);
  }

  async addNumber(num: number) {
    if (this.createPasscodeValues.length !== 6) {
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        document.getElementById(`circles${i}`).classList.add('test');
      }
      if (this.createPasscodeValues.length === 6) {
        const loading = await this.loadingCtrl.create({
          message: 'Please wait...',
          cssClass: 'custom-loading',
        });
        loading.present();

        this.convertedPin = this.createPasscodeValues
          .toString()
          .replace(/,/g, ''); //  convert array values to string
        this.validateOtp.otp = this.convertedPin;
        this.validateOtp.accountNumber = this.accountNumber; //gotten from shared service
        this.httpSubscriptions.push(
          this.forgotPasswordService.validateOtp(this.validateOtp).subscribe(
            (data) => {
              loading.dismiss();
              this.modalCtrl.dismiss(null, 'cancel');
              this.router.navigateByUrl('/create-pin');
            },
            (err) => {
              loading.dismiss();
              this.presentAlert(err.error.message || 'Unable to reach server');
              // this.router.navigateByUrl('/signup-form');
            }
          )
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

  ngOnDestroy() {
    this.httpSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }
}
