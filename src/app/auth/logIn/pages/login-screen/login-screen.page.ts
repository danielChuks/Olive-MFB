import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginModel } from '../../LoginModel';
import { LoginServiceService } from '../../login-service.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth.service';
import { UnlinkModel } from '../../UnlinkModel';
import { DashboardService } from 'src/app/hometab/dashboard.service';
import { IdleTimerService } from 'src/app/idle-timer.service';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { Device } from '@ionic-native/device';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage {
  loginMsg = 'Log in'
  message: string;
  // eslint-disable-next-line @typescript-eslint/semi
  login = new LoginModel();
  unlinkDetails = new UnlinkModel();
  test = 'testing12';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PresentDate = new Date();
  signInForm: FormGroup;
  inputAccountNumber;
  savedAccountNumber;
  pwdIcon = 'eye';
  showPwd = false;
  isFirstEnter = true;
  isFieldDisabled: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  USER_AUTH_KEY: any;
  failedAttempts = 0;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private LoginService: LoginServiceService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private idleTimer: IdleTimerService,
    private _location: Location,
    private platform: Platform,
    private fingerprint: FingerprintAIO
  ) {
    this.signInForm = this.formBuilder.group({
      accountNumber: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.initializeApp();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.savedAccountNumber = localStorage.getItem('accountNumber');
    if (this.savedAccountNumber) {
      this.signInForm.get('accountNumber').setValue(this.savedAccountNumber);
    }
    this.checkLoginStatus();
  }

  ionViewWillEnter() {
    //check if you're entering the page for the second time
    if (!this.isFirstEnter) {
      this.signInForm.get('password').setValue('');
      if (this.savedAccountNumber) {
        this.signInForm.get('accountNumber').setValue(this.savedAccountNumber);
      }
      else {
      }
    }
    this.isFirstEnter = false;
  }

  unlinkDevice() {
    localStorage.clear();
    sessionStorage.clear();
    this.savedAccountNumber = '';
    this.signInForm.get('accountNumber').setValue('');
  }

  async checkLoginStatus() {
    const storedAccNo = sessionStorage.getItem('accountNumber');
    if (storedAccNo) {
        // Account number is stored, set loginMsg to "Login with Biometrics"
        this.loginMsg = "Login with Biometrics";
    } else {
        // No account number stored, set loginMsg to "Login"
        this.loginMsg = "Login";
    }
}

  async loginWithFingerprint() {
    const storedAccNo = sessionStorage.getItem('accountNumber');

    if (storedAccNo) {
      // Password is stored, proceed with fingerprint authentication
      const options = {
        title: 'Olive App Authentication',
        description: 'Touch your fingerprint sensor',
        fallbackButtonTitle: 'Use Backup',
        disableBackup: false,
      };

      try {
        await this.fingerprint.show(options);
        // this.savedAccountNumber = sessionStorage.getItem('accountNumber');
        this.router.navigateByUrl('new-tab/hometab');
        // this.signIn(); // Call signIn function on successful fingerprint authentication
      } catch (err) {
        // Handle fingerprint authentication error
      }
    } else {
      // No password stored, call signIn directly with formGroup as an argument
      this.signIn(this.signInForm);
    }
  }

  async signIn(formGroup?: FormGroup) {
    // Loading component
    const loading = await this.loadingCtrl.create({
      message: 'Signing in....',
      cssClass: 'custom-loading',
    });
    loading.present();
    // this.login.accountNumber = formGroup ? formGroup.value.accountNumber : localStorage.getItem('accountNumber');
    // this.login.password = formGroup ? formGroup.value.password : localStorage.getItem('password');
    this.login.accountNumber = formGroup.value.accountNumber;
    this.login.password = formGroup.value.password;
    this.login.appVersion = 'v3';
    this.login.deviceUIID = 'ae49ded2873115c7'; // capacitor / cordova
    const date = new Date();
    this.login.currentDate = '31-01-2025'; // not hard-coded

    this.LoginService.loginWithDetails(this.login).subscribe(
      (data) => {
        console.log(data);
        sessionStorage.setItem('accountNumber', this.login.accountNumber);
        localStorage.setItem('accountNumber', this.login.accountNumber);
        // localStorage.setItem('password', this.login.password);
        this.savedAccountNumber = localStorage.getItem('accountNumber');
        this.biometricMsg();
        loading.dismiss();
        // this.idleTimer.onInterrupt();
        this.failedAttempts = 0;
      },
      (error) => {
        console.log(error);
        loading.dismiss();
        if (error.status === 400 && error.error.message) {
          // console.log(error.error.message);
          this.presentAlert(error.error.message);
        } else if (error.status === 403) {
          this.failedAttempts++;
          if (this.failedAttempts >= 4) {
            this.presentAlert(
              'Try forgot password, or your account will be disabled'
            );
          } else {
            this.presentAlert('Wrong AccountNo/Password');
          }
        } else if (error.status === 500) {
          this.presentAlert(error.error.error);
        } else {
          this.presentAlert('An error occurred');
        }
      }
    );
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async biometricMsg() {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message:
        'Would you like a faster login using biometrics?',
      buttons: [
        {
          text: 'No',
          role: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.router.navigateByUrl('new-tab/hometab');
            alert.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentUnlink() {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message:
        'This action will clear all login details. Do you wish to continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Unlink',
          handler: () => {
            this.unlinkDevice();
            alert.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off' : 'eye';
  }

  initializeApp() {
    this.platform.ready().then(() => {});

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      // eslint-disable-next-line no-underscore-dangle
      if (this._location.isCurrentPathEqualTo('/login-screen')) {
        // Show Exit Ale
        // eslint-disable-next-line @typescript-eslint/dot-notation
        navigator['app'].exitApp();
      }
    });
  }
}
