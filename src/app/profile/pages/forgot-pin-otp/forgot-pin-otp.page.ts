import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForgotPasswordService } from 'src/app/forgot-password/forgot-password.service';
import { validateOtpModel } from 'src/app/forgot-password/validateOtpModel';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { forgotPinModel } from 'src/app/forgot-password/validateOtpModel';
import { GeneralServiceService } from 'src/app/general-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pin-otp',
  templateUrl: './forgot-pin-otp.page.html',
  styleUrls: ['./forgot-pin-otp.page.scss'],
})
export class ForgotPinOtpPage implements OnInit, OnDestroy {
  accountNumber;
  convertedPin;
  otpDetails = new validateOtpModel();
  forgotPinDetails = new forgotPinModel();
  countdownTime = 120; // adjust this value as needed
  disableResendButton = true;

  private createPasscodeValues: number[] = [];

  constructor(
    private otpService: ForgotPasswordService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private sharedService: GeneralServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedService.setForgotPindetails.subscribe((data) => {
      this.forgotPinDetails.newPIN = data.pin;
      this.forgotPinDetails.password = data.password;
    });
    this.startCountdown();
    this.accountNumber = sessionStorage.getItem('accountNumber');
  }
  cancel() {
    this.router.navigateByUrl('/forgot-pin');
  }
  //call forgotpin endpoint to create new pin
  async createNewPin() {
    this.forgotPinDetails.accountNumber = this.accountNumber;
    const loading = await this.loadingCtrl.create({
      message: '',
      cssClass: 'custom-loading',
    });
    loading.present();

    this.otpService.forgotPin(this.forgotPinDetails).subscribe(
      (data) => {
        loading.dismiss();
        this.router.navigateByUrl('/success-page');
      },
      (err) => {
        loading.dismiss();
        this.presentAlert(err.error.message || 'Unable to reach server');
      }
    );
  }

  //validate otp here
  async validateOtp(info) {
    const loading = await this.loadingCtrl.create({
      message: '',
      cssClass: 'custom-loading',
    });
    loading.present();
    this.otpService.validateOtp(info).subscribe(
      (data) => {
        loading.dismiss();
        this.createNewPin(); //call forgot pin if otp is successfully validated
      },
      (err) => {
        loading.dismiss();
        this.presentAlert(err.error.message || 'Unable to reach server');
        //console.log(err);
      }
    );
  }

  //start countdown
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

  //resend OTP
  resendOtp() {
    this.otpService.requestOtp(this.accountNumber).subscribe(
      (data) => {
        //console.log('otp generated');
      },
      (err) => {
        this.presentAlert('Unable to generate Otp for this Account Number');
      }
    );
    this.countdownTime = 120;
    this.startCountdown();
  }

  async addNumber(num: number) {
    if (this.createPasscodeValues.length !== 6) {
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        document.getElementById(`forgotpin${i}`).classList.add('filled');
      }
      if (this.createPasscodeValues.length === 6) {
        this.convertedPin = this.createPasscodeValues
          .toString()
          .replace(/,/g, ''); //convert to string then remove the commas
        this.otpDetails.accountNumber = this.accountNumber;
        this.otpDetails.otp = this.convertedPin;
        this.validateOtp(this.otpDetails); //validate otp when it's six digits
      }
    }
    //console.log(this.createPasscodeValues);
  }

  removeNumber() {
    this.createPasscodeValues.pop();
    //console.log(this.createPasscodeValues);
    for (let i = this.createPasscodeValues.length; i >= 0; i++) {
      document.getElementById(`forgotpin${i}`).classList.remove('filled');
      break;
    }
  }

  ngOnDestroy() {
    if (this.createPasscodeValues.length > 0) {
      for (let i = 0; i <= this.createPasscodeValues.length; i++) {
        document.getElementById(`forgotpin${i}`).classList.remove('filled');
      }
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
