import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { confirmPinModel } from './confirmPinModel';
import { ForgotPasswordService } from './forgot-password.service';
import { AlertController } from '@ionic/angular';
import { GeneralServiceService } from '../general-service.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit, OnDestroy {
  sendOtpForm: FormGroup;
  formDetails = new confirmPinModel(); //create an instance of accessPin class
  private httpSubscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private generalService: GeneralServiceService,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.sendOtpForm = this.formBuilder.group({
      accountNumber: ['', [Validators.required, Validators.minLength(10)]],
      pin: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {}

  //request for otp
  async generateOtp() {
    const loading = await this.loadingCtrl.create({
      message: '',
      cssClass: 'custom-loading',
    });
    loading.present();
    this.httpSubscriptions.push(
      this.forgotPasswordService
        .requestOtp(this.sendOtpForm.get('accountNumber').value)
        .subscribe(
          (data) => {
            loading.dismiss();
            this.router.navigateByUrl('/otp-page');
          },
          (err) => {
            loading.dismiss();
            this.presentAlert(err.error.message || 'Unable to reach server');
          }
        )
    );
  }

  async authorizePin(formGroup: FormGroup) {
    const loading = await this.loadingCtrl.create({
      message: '',
      cssClass: 'custom-loading',
    });
    loading.present();

    this.formDetails.accountNumber = formGroup.value.accountNumber;
    this.formDetails.transactionPIN = formGroup.value.pin;
    this.generalService.updateAccountNum(
      this.sendOtpForm.get('accountNumber').value
    ); //set account number to sharedservice
    this.httpSubscriptions.push(
      this.forgotPasswordService
        .validatePin(this.formDetails) //validate transaction pin and request otp
        .subscribe(
          (data) => {
            loading.dismiss();
            this.generateOtp(); //if pin validates, request for otp
          },
          (err) => {
            loading.dismiss();
            this.presentAlert(err.error.message || 'Unable to reach server');
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
