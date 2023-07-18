import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/auth/logIn/login-service.service';
import { LoginModel } from 'src/app/auth/logIn/LoginModel';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ForgotPasswordService } from 'src/app/forgot-password/forgot-password.service';
import { GeneralServiceService } from 'src/app/general-service.service';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.page.html',
  styleUrls: ['./forgot-pin.page.scss'],
})
export class ForgotPinPage implements OnInit {
  details = new LoginModel();
  forgotPinForm: FormGroup;
  accountNumber: any;
  endpointInfo: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private otpService: ForgotPasswordService,
    private sharedService: GeneralServiceService
  ) {
    this.forgotPinForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      pin: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {
    this.accountNumber = sessionStorage.getItem('accountNumber');
  }

  async generateOtp() {
    this.otpService.requestOtp(this.accountNumber).subscribe(
      (data) => {},
      (err) => {
        this.presentAlert(err.error.message || 'Unable to reach server');
      }
    );
  }

  async checkPassword(formGroup: FormGroup) {
    const loading = await this.loadingCtrl.create({
      message: '',
      cssClass: 'custom-loading',
    });
    loading.present();

    this.details.accountNumber = this.accountNumber;
    this.details.appVersion = 'v3';
    const date = new Date();
    this.details.currentDate = date
      .toLocaleDateString('en-GB')
      .replace(/\//g, '-');
    this.details.password = formGroup.value.password;
    // this.details.deviceUIID = 'ae49ded2873115c7';
    this.details.deviceUIID = Device.uuid;

    //check if password is correct
    this.loginService.loginWithDetails(this.details).subscribe(
      (data) => {
        //go to next page and request otp if password is correct
        loading.dismiss();
        this.router.navigateByUrl('/forgot-pin-otp');
        this.generateOtp();
      },
      (error) => {
        loading.dismiss();
        if (error.status === 403 && error.error.message) {
          // //console.log(error.error.message);
          this.presentAlert(error.error.message);
        } else if (error.status === 500) {
          this.presentAlert(error.error.error);
        } else {
          this.presentAlert('An error occurred');
        }
      }
    );

    //store  pin and password
    this.endpointInfo = {
      password: formGroup.value.password,
      pin: formGroup.value.pin,
    };
    this.sharedService.updatePinDetails(this.endpointInfo);
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
