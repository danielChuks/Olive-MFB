import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { confirmPinModel } from '../confirmPinModel';
import { ForgotPasswordService } from '../forgot-password.service';
import { AlertController } from '@ionic/angular';
import { validateOtpModel } from '../validateOtpModel';
import { changePasswordWithPinModel } from '../changePasswordWithPin';
import { GeneralServiceService } from 'src/app/general-service.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.page.html',
  styleUrls: ['./otp-page.page.scss'],
})
export class OtpPagePage implements OnInit, OnDestroy {
  accountNumber;
  validateOtp = new validateOtpModel();
  changePasswordDetails = new changePasswordWithPinModel();
  changePasswordForm: FormGroup;
  countdownTime = 120; // adjust this value as needed
  disableResendButton = true;
  private httpSubscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private forgotPasswordService: ForgotPasswordService,
    private generalService: GeneralServiceService,
    private loadingCtrl: LoadingController
  ) {
    this.changePasswordForm = this.formBuilder.group(
      {
        otp: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmNewPassword: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      },
      // eslint-disable-next-line max-len
      { validator: this.passwordMatchValidator } //if this validator is true, formgroup returns invalid, i.e validator must return null for that form to be valid
    );
  }

  passwordMatchValidator(form: AbstractControl): { invalid: boolean } {
    if (
      form.get('newPassword').value !== form.get('confirmNewPassword').value
    ) {
      return { invalid: true };
    }
  }

  ngOnInit() {
    this.startCountdown();
    this.generalService.currentAccountNum.subscribe((msg) => {
      this.accountNumber = msg; //get account number from shared service
    });
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

  //resend OTP
  resendOtp() {
    this.forgotPasswordService.requestOtp(this.accountNumber).subscribe(
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

  changePasswordWithPin() {
    this.httpSubscriptions.push(
      this.forgotPasswordService
        .changePasswordWithTransactionPin(this.changePasswordDetails)
        .subscribe(
          (data) => {
            this.loadingCtrl.dismiss();
            this.router.navigateByUrl('/success-page');
          },
          (err) => {
            this.loadingCtrl.dismiss();
            this.presentAlert(err.error.message || 'Unable to reach server');
          }
        )
    );
  }

  async changePassword(formGroup: FormGroup) {
    const loading = await this.loadingCtrl.create({
      message: '',
      cssClass: 'custom-loading',
    });
    loading.present();
    //validate otp details
    this.validateOtp.accountNumber = this.accountNumber;
    this.validateOtp.otp = formGroup.value.otp;

    //changepasswordwith pin details
    this.changePasswordDetails.accountNumber = this.accountNumber;
    this.changePasswordDetails.otp = formGroup.value.otp;
    this.changePasswordDetails.newPassword = formGroup.value.confirmNewPassword;

    //First Check : Validate Otp!
    this.httpSubscriptions.push(
      this.forgotPasswordService.validateOtp(this.validateOtp).subscribe(
        (data) => {
          this.changePasswordWithPin();
        },
        (err) => {
          loading.dismiss();
          this.presentAlert(err.error.message || 'Unable to reach server');
          //recheck and test for errors cuz even if one of the credentials are wrong, it still returns unable to reacvh server
        }
      )
    );
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnDestroy() {
    if (this.httpSubscriptions.length > 0) {
      this.httpSubscriptions.forEach((subscription) =>
        subscription.unsubscribe()
      );
    }
  }
}
